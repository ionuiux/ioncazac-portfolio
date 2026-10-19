// Prints the homepage — exactly as it looks on a 1440px-wide screen — to a single
// tall PDF page with every link still clickable, and saves it as the CV download.
//   - Links to other pages (case studies, the CV itself) point to the live site.
//   - Email, LinkedIn and Dribbble links work as they do on the site.
//   - "#" links (e.g. Back to top) jump within the PDF.
//
// Usage: npm run build && npm run pdf
// It starts the production build locally, prints it with Chrome, then stops both.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const SITE = "https://ioncazac.com";
const PORT = 3210;
const WIDTH = 1440;
const OUT = join(process.cwd(), "public", "Ion-Cazac-CV.pdf");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function waitFor(check, what, timeout = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const result = await check().catch(() => null);
    if (result) return result;
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${what}`);
}

// Minimal Chrome DevTools Protocol client over Node's built-in WebSocket.
function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) {
      listeners.forEach((fn) => fn(msg));
    }
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  const once = (method) => new Promise((resolve) => listeners.push((m) => m.method === method && resolve(m)));
  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => resolve({ send, once, close: () => ws.close() }));
    ws.addEventListener("error", reject);
  });
}

// Runs inside the page before printing.
async function preparePage(site) {
  // Load every lazy image now instead of when it scrolls into view.
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = "eager"));
  await Promise.all(
    [...document.images].map((img) =>
      img.complete ? null : new Promise((done) => (img.onload = img.onerror = done)),
    ),
  );
  await document.fonts.ready;
  // Show the tiles that normally fade in as you scroll.
  document.querySelectorAll("[data-reveal]").forEach((tile) => {
    tile.style.transition = "none";
    tile.classList.add("is-in");
  });
  // Freeze the moving logo strip with Flovi first, just clear of the left edge fade (8%).
  document.querySelectorAll(".logo-track").forEach((track) =>
    track.getAnimations().forEach((animation) => {
      const shift = track.parentElement.offsetWidth * 0.09;
      const duration = animation.effect.getComputedTiming().duration;
      animation.pause();
      animation.currentTime = (duration * shift) / track.firstElementChild.offsetWidth;
    }),
  );
  // Links to other pages open the live site; "#" links stay inside the PDF.
  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    a.href = new URL(a.getAttribute("href"), site).href;
    a.removeAttribute("download");
  });
  return Math.ceil(document.documentElement.scrollHeight);
}

const server = spawn(join("node_modules", ".bin", "next"), ["start", "-p", String(PORT)], { stdio: "ignore" });
const profile = await mkdtemp(join(tmpdir(), "site-pdf-"));
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", "--hide-scrollbars", `--user-data-dir=${profile}`, "about:blank"], {
  stdio: "ignore",
});

try {
  if (!existsSync(join(".next", "BUILD_ID"))) throw new Error("No production build found — run `npm run build` first.");
  await waitFor(async () => (await fetch(`http://localhost:${PORT}/`)).ok, "the local site");

  const [port, path] = (await waitFor(() => readFile(join(profile, "DevToolsActivePort"), "utf8"), "Chrome")).trim().split("\n");
  const cdp = await connect(`ws://127.0.0.1:${port}${path}`);
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const send = (method, params) => cdp.send(method, params, sessionId);

  await send("Page.enable");
  // Ask for JPEG images: the PDF can store them as they are, whereas WebP/AVIF
  // would be re-stored losslessly and make the file several times bigger.
  await send("Network.enable");
  await send("Network.setExtraHTTPHeaders", { headers: { Accept: "image/jpeg,image/png,text/html,*/*;q=0.8" } });
  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 900, deviceScaleFactor: 2, mobile: false });
  await send("Emulation.setEmulatedMedia", { media: "screen" });
  const loaded = cdp.once("Page.loadEventFired");
  await send("Page.navigate", { url: `http://localhost:${PORT}/` });
  await loaded;

  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    expression: `(${preparePage})(${JSON.stringify(SITE)})`,
    awaitPromise: true,
    returnByValue: true,
  });
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? "Preparing the page failed");

  // One page, exactly the size of the site. The paper size is passed here (in
  // inches, 96px each) rather than with CSS @page, because Chrome checks the
  // site's screen-size rules against this paper width — CSS @page alone would
  // leave it on US Letter and print the tablet layout.
  const height = result.value;
  const { data } = await send("Page.printToPDF", {
    printBackground: true,
    paperWidth: WIDTH / 96,
    paperHeight: height / 96,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });
  await writeFile(OUT, Buffer.from(data, "base64"));
  cdp.close();
  console.log(`Saved ${OUT} (${WIDTH}×${height}px, one page)`);
} finally {
  chrome.kill();
  server.kill();
  await sleep(500);
  await rm(profile, { recursive: true, force: true });
}
