import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const description =
  "Ion Cazac is a Senior Product Designer helping product teams turn complex problems into simple, usable products.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ioncazac.com"),
  title: {
    default: "Ion Cazac — Senior Product Designer",
    template: "%s — Ion Cazac",
  },
  description,
  openGraph: {
    title: "Ion Cazac — Senior Product Designer",
    description,
    url: "/",
    siteName: "Ion Cazac",
    images: [{ url: "/ion.jpg", width: 800, height: 800 }],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" id="top" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
