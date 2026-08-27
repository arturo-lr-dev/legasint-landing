/**
 * Inline script that must run before any gtag/GA/Ads loader.
 * In the App Router, next/script beforeInteractive cannot be used outside
 * _document, so we render a plain inline <script> in the root layouts.
 */
export default function ConsentDefaultScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `,
      }}
    />
  );
}
