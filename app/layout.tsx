import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/pixel/MetaPixel";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sell-your-phone-uk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "The Phone House UK | Upfront + Monthly Phone Deals",
    template: "%s | The Phone House UK",
  },
  description:
    "Buy your next iPhone or Samsung in the UK with flexible upfront cost and monthly instalment plans from a trusted retailer.",
  keywords: [
    "buy phone UK",
    "iPhone deals UK",
    "Samsung deals UK",
    "monthly instalment phones",
    "phone contract deals",
    "upfront phone cost UK",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "The Phone House UK",
    title: "The Phone House UK | Upfront + Monthly Phone Deals",
    description:
      "Flexible upfront and monthly plans with trusted UK support for iPhone and Samsung devices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Phone House UK | Upfront + Monthly Phone Deals",
    description:
      "Flexible upfront and monthly plans with trusted UK support for iPhone and Samsung devices.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e4007f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={font.variable}>
      <body className="min-h-dvh font-sans antialiased">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
