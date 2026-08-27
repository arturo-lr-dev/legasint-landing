import Script from 'next/script'

const GOOGLE_ADS_ID = 'AW-18414116550'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  return (
    <>
      {/* One gtag.js loader is enough; we use the Google Ads ID as the primary loader */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${gaId ? `gtag('config', '${gaId}');` : ''}
          gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });
        `}
      </Script>
    </>
  )
}
