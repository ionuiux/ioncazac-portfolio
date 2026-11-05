# Makes the moving parts of the homepage portrait from public/ion.jpg:
#
#   - Two blink frames (half-closed and closed eyes). Each lid takes its colour
#     from the real eyelid skin just above the lash line (smoothed sideways so
#     it doesn't streak), gets a little shading and the photo's own grain, and
#     ends in a soft lash line. Only the eye openings change.
#   - Eye layers for the mouse tracking: per eye, the white of the eye with the
#     iris painted out, the iris as a round cut-out, and the upper lid lowered
#     in a few steps (real lids follow the eyes down). The page slides the
#     irises around inside the eye openings (src/components/portrait.tsx),
#     using the outlines and positions written to src/content/portrait-eyes.json.
#
# The eye outlines and irises below are measured on the current ion.jpg
# (800×800): if the photo changes, measure them again.
#
# Usage, from the project folder (needs numpy and Pillow):
#   python3 scripts/portrait-frames.py
import json
import numpy as np
from PIL import Image

SRC = "public/ion.jpg"
OUT = "public/portrait"
JSON_OUT = "src/content/portrait-eyes.json"

img = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)
H, W, _ = img.shape
rng = np.random.default_rng(7)

# Lash line (upper lid), lower lid and iris, measured on the 800×800 photo.
EYES = [
    {
        "x": (251, 319),
        "upper": [(251, 358), (255, 350), (265, 346), (280, 345), (295, 348), (305, 351), (315, 355), (319, 360)],
        "lower": [(251, 358), (260, 366), (275, 370), (290, 369), (305, 366), (315, 362), (319, 360)],
        "iris": (280.0, 359.0, 12.5),
    },
    {
        "x": (399, 480),
        "upper": [(399, 366), (410, 358), (420, 353), (430, 349), (440, 347), (450, 349), (460, 352), (470, 357), (480, 363)],
        "lower": [(399, 366), (410, 368), (425, 373), (440, 375), (455, 373), (470, 368), (480, 363)],
        "iris": (439.5, 360.5, 13.5),
    },
]
# How far the irises may move, in photo pixels (they hide under the lids beyond
# the opening), and the lowered-lid steps used when looking down.
RANGE = {"x": 12, "up": 4, "down": 6.5}
LID_STEP = 1.5  # px the lid drops per step
LID_STEPS = 4
LASH = np.array([40, 34, 38], np.float32)


def curve(points, xs):
    px, py = zip(*points)
    return np.interp(xs, px, py)


def smooth(values, width):
    """Moving average along the first axis, edges held."""
    pad = width // 2
    padded = np.pad(values, ((pad, pad), (0, 0)), mode="edge")
    kernel = np.ones(width) / width
    return np.stack([np.convolve(padded[:, c], kernel, mode="valid") for c in range(values.shape[1])], axis=1)


def inside(eye, x, y):
    x0, x1 = eye["x"]
    if not x0 <= x <= x1:
        return False
    return curve(eye["upper"], x) <= y <= curve(eye["lower"], x)


# Blink frames ---------------------------------------------------------------


def close(amount, eyes=EYES, coverage=None):
    """Paints the upper lids `amount` of the way down. If given, `coverage`
    (an H×W array) records where the painting landed and how strongly."""
    out = img.copy()
    for eye in eyes:
        x0, x1 = eye["x"]
        xs = np.arange(x0, x1 + 1)
        up, low = curve(eye["upper"], xs), curve(eye["lower"], xs)
        # Lid colour per column: eyelid skin above the lash line, and lower-lid
        # skin just under the eye, both smoothed sideways.
        lid_skin = smooth(np.array([img[int(yu) - 9 : int(yu) - 4, x].mean(0) for x, yu in zip(xs, up)]), 9)
        low_skin = smooth(np.array([img[int(yl) + 3 : int(yl) + 6, x].mean(0) for x, yl in zip(xs, low)]), 9)
        for i, (x, yu, yl) in enumerate(zip(xs, up, low)):
            if yl - yu < 0.5:
                continue
            fade = float(np.clip(min(x - x0, x1 - x) / 4.0, 0, 1))  # melt into the corners
            yc = yu + amount * (yl - yu)  # where the lid edge ends up
            top = yu - 5  # covers the old lash line; the crease above stays
            bottom = yl + 2.5 if amount > 0.75 else yc + 1.5
            ys = np.arange(int(np.floor(top)), int(np.ceil(bottom)) + 1)
            t = np.clip((ys - top) / max(yc - top, 1e-3), 0, 1)[:, None]
            # Rounded over the eyeball: a soft highlight mid-lid, darker towards the edge.
            lid = lid_skin[i] * (1 + 0.05 * np.sin(np.pi * t) - 0.14 * t**2)
            if amount > 0.75:
                lid = np.where((ys > yc)[:, None], low_skin[i], lid)
            lid = lid + rng.normal(0, 2.8, (len(ys), 1))  # the photo's grain
            # Soft lash line along the closing edge, plus a faint fringe below it.
            d = (ys - yc)[:, None]
            lash = 0.8 * np.exp(-0.5 * (d / 0.75) ** 2) + 0.22 * np.clip(1 - d / 2.5, 0, 1) * (d > 0)
            lash *= 0.35 + 0.65 * fade
            lid = lid * (1 - lash) + LASH * lash
            # Blend in: ramp at the top, hard stop at the bottom edge, fade at corners.
            alpha = np.clip((ys - top) / 2.0, 0, 1) * np.clip(bottom - ys, 0, 1) * fade
            if coverage is not None:
                coverage[ys, x] = np.maximum(coverage[ys, x], alpha)
            alpha = alpha[:, None]
            out[ys, x] = out[ys, x] * (1 - alpha) + lid * alpha
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


# Eye layers for the mouse tracking -------------------------------------------


FILL = 3.0  # px past the iris edge that get repainted, so its dark rim doesn't stay behind
IRIS_CONTRAST = 0.8  # irises a little softer and lighter than in the photo
IRIS_LIFT = 14


def safe(eye, x, y, margin=2.0):
    """Inside the eye opening and clear of the lash lines."""
    x0, x1 = eye["x"]
    if not x0 + margin <= x <= x1 - margin:
        return False
    return curve(eye["upper"], x) + margin <= y <= curve(eye["lower"], x) - margin * 0.75


def paint_out_iris(eye):
    """The photo with this eye's iris replaced by the white of the eye."""
    cx, cy, r = eye["iris"]
    R = r + FILL
    fill = img.copy()
    rows = list(range(int(cy - R - 2), int(cy + R + 3)))
    spans = {}
    for y in rows:
        half = np.sqrt(max(0.0, (R + 1.5) ** 2 - (y - cy) ** 2))
        xl, xr = int(np.floor(cx - half)), int(np.ceil(cx + half))
        spans[y] = (xl, xr)
        # Sample the white on both sides (the brighter part of a few pixels, so
        # lashes and the iris rim don't grey it), only where it's clear of the
        # lids; rows too close to a lid borrow the nearest clear row's samples.
        if safe(eye, xl - 3, y, 1.0) and safe(eye, xr + 3, y, 1.0):
            left = np.percentile(img[y, xl - 5 : xl], 75, axis=0)
            right = np.percentile(img[y, xr + 1 : xr + 6], 75, axis=0)
            spans[y] = (xl, xr, left, right)
    clear = [y for y in rows if len(spans[y]) == 4]
    for y in rows:
        xl, xr = spans[y][:2]
        ref = spans[min(clear, key=lambda c: abs(c - y))]
        left, right = ref[2], ref[3]
        t = ((np.arange(xl, xr + 1) - xl) / max(xr - xl, 1))[:, None]
        fill[y, xl : xr + 1] = left * (1 - t) + right * t
    # Smooth the rows into each other, and lift the greyer rows part of the
    # way towards the brightest white, so the patch doesn't read as a smudge.
    soft = fill.copy()
    for y in rows:
        soft[y] = fill[y - 2 : y + 3].mean(0)
    xs_all = slice(int(cx - R - 1), int(cx + R + 2))
    row_tone = {y: soft[y, xs_all].mean(0) for y in clear}
    brightest = max(row_tone.values(), key=lambda c: c.sum())
    for y in rows:
        soft[y, xs_all] += (brightest - soft[y, xs_all]) * 0.35
    # A light shadow under the lids, and the photo's grain.
    ys, xs = np.mgrid[rows[0] : rows[-1] + 1, int(cx - R - 3) : int(cx + R + 4)]
    below_upper = np.clip(ys - curve(eye["upper"], xs), 0, None)
    above_lower = np.clip(curve(eye["lower"], xs) - ys, 0, None)
    shade = 1 - 0.25 * np.exp(-below_upper / 1.8) - 0.1 * np.exp(-above_lower / 1.5)
    patch = soft[ys, xs] * shade[..., None] + rng.normal(0, 2.0, ys.shape + (1,))
    # Full strength over the iris and its rim, fading out over 2px.
    d = np.hypot(xs + 0.5 - cx, ys + 0.5 - cy)
    w = np.clip((R + 1.5 - d) / 2.0, 0, 1)[..., None]
    out = img.copy()
    out[ys, xs] = img[ys, xs] * (1 - w) + patch * w
    return out


def iris_layer(eye):
    """The iris as a round RGBA cut-out with a soft edge. Parts hidden under,
    or shadowed by, the lids are filled in from the clear part of the iris, so
    nothing dark travels with it when it moves."""
    cx, cy, r = eye["iris"]
    x0, y0 = int(np.floor(cx - r - 2)), int(np.floor(cy - r - 2))
    size = int(np.ceil(2 * r + 4))
    layer = np.zeros((size, size, 4), np.float32)
    for j in range(size):
        for i in range(size):
            x, y = x0 + i, y0 + j
            d = np.hypot(x + 0.5 - cx, y + 0.5 - cy)
            alpha = np.clip((r + 0.75 - d) / 1.5, 0, 1)
            if alpha == 0:
                continue
            sx, sy = x, y
            if not safe(eye, x, y):
                my = int(round(2 * cy - y))
                if safe(eye, x, my):
                    sy = my
                else:
                    # Step in towards the centre until the iris is clear.
                    for k in np.linspace(0.1, 1, 10):
                        px, py = cx + (x - cx) * (1 - k), cy + (y - cy) * (1 - k)
                        if safe(eye, px, py):
                            sx, sy = int(round(px)), int(round(py))
                            break
            layer[j, i, :3] = img[sy, sx]
            layer[j, i, 3] = alpha * 255
    rgb, a = layer[..., :3], layer[..., 3:] / 255
    mean = (rgb * a).sum((0, 1)) / a.sum()
    layer[..., :3] = mean + (rgb - mean) * IRIS_CONTRAST + IRIS_LIFT
    return x0, y0, size, Image.fromarray(np.clip(layer, 0, 255).astype(np.uint8), "RGBA")


def outline(eye):
    x0, x1 = eye["x"]
    xs = np.arange(x0, x1 + 1)
    up, low = curve(eye["upper"], xs), curve(eye["lower"], xs)
    points = list(zip(xs, up)) + list(zip(xs[::-1], low[::-1]))
    return "M" + " L".join(f"{x:g} {y:.1f}" for x, y in points) + " Z"


close(0.5).save(f"{OUT}/blink-half.jpg", quality=92)
close(0.9).save(f"{OUT}/blink-closed.jpg", quality=92)

layout = {"size": W, "range": RANGE, "lidStep": LID_STEP, "eyes": []}
for n, eye in enumerate(EYES, start=1):
    x0, x1 = eye["x"]
    top = int(np.floor(min(y for _, y in eye["upper"]))) - 1
    bottom = int(np.ceil(max(y for _, y in eye["lower"]))) + 1
    white = paint_out_iris(eye)[top : bottom + 1, x0 - 1 : x1 + 2]
    Image.fromarray(np.clip(white, 0, 255).astype(np.uint8)).save(f"{OUT}/eye-{n}-white.png")
    ix, iy, isize, iris = iris_layer(eye)
    iris.save(f"{OUT}/eye-{n}-iris.png")
    # Lowered lids: the painted lid only, cut out with its own soft edges.
    height = max(curve(eye["lower"], x) - curve(eye["upper"], x) for x in range(x0, x1 + 1))
    lid_top = top - 6
    lids = []
    for step in range(1, LID_STEPS + 1):
        coverage = np.zeros((H, W), np.float32)
        lowered = np.asarray(close(step * LID_STEP / height, [eye], coverage)).astype(np.float32)
        rgba = np.dstack([lowered, coverage[..., None] * 255])[lid_top : bottom + 1, x0 - 1 : x1 + 2]
        Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8), "RGBA").save(f"{OUT}/eye-{n}-lid-{step}.png")
        lids.append(f"/portrait/eye-{n}-lid-{step}.png")
    layout["eyes"].append(
        {
            "outline": outline(eye),
            "lids": {"srcs": lids, "x": x0 - 1, "y": lid_top, "width": x1 - x0 + 3, "height": bottom - lid_top + 1},
            "white": {"src": f"/portrait/eye-{n}-white.png", "x": x0 - 1, "y": top, "width": x1 - x0 + 3, "height": bottom - top + 1},
            "iris": {"src": f"/portrait/eye-{n}-iris.png", "x": ix, "y": iy, "width": isize, "height": isize},
            "center": {"x": eye["iris"][0], "y": eye["iris"][1]},
        }
    )
with open(JSON_OUT, "w") as f:
    json.dump(layout, f, indent=2)
    f.write("\n")
print("saved blink frames, eye layers and", JSON_OUT)
