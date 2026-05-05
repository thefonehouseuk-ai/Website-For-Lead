"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { trackMetaPageView } from "@/lib/meta-pixel";

const DEFAULT_PIXEL_IDS = ["1227394948960539", "980478111144698"];
const PIXEL_IDS = Array.from(
  new Set(
    (
      process.env.NEXT_PUBLIC_META_PIXEL_IDS ||
      process.env.NEXT_PUBLIC_META_PIXEL_ID ||
      DEFAULT_PIXEL_IDS.join(",")
    )
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  ),
);

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!PIXEL_IDS.length) return;
    trackMetaPageView();
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixel() {
  if (!PIXEL_IDS.length) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join("\n")}
        `}
      </Script>
      {PIXEL_IDS.map((id) => (
        <noscript key={id}>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ))}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
