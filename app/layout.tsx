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
      "Sell Your Phone UK | Instant Cash Quotes & Free Collection",
    template: "%s | Sell Your Phone UK",
  },
  description:
    "Sell your iPhone or Samsung in the UK with free doorstep collection, fast secure payment, and a trusted buying process. Get your instant cash quote today.",
  keywords: [
    "sell phone UK",
    "sell iPhone UK",
    "trade in phone",
    "cash for phones",
    "Samsung sell UK",
    "free phone collection",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Sell Your Phone UK",
    title: "Sell Your Phone UK | Instant Cash & Free Collection",
    description:
      "Free UK collection, fast payment, and a premium selling experience for iPhone and Samsung devices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Phone UK | Instant Cash & Free Collection",
    description:
      "Free UK collection, fast payment, and a premium selling experience for iPhone and Samsung devices.",
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
