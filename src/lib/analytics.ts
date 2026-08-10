type EventName = 'phone_click' | 'quote_click' | 'quote_submit' | 'map_click' | 'review_click' | 'email_click';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const loadScript = (src: string, id: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export function initAnalytics() {
  const gtm = import.meta.env.VITE_GTM_CONTAINER_ID as string | undefined;
  const ga4 = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

  if (gtm) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`, 'jdc-gtm');
  }

  if (ga4 && !gtm) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`, 'jdc-ga4');
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag('js', new Date());
    window.gtag('config', ga4, { anonymize_ip: true });
  }
}

export function track(event: EventName, data: Record<string, string | number | boolean> = {}) {
  window.dataLayer?.push({ event, ...data });
  window.gtag?.('event', event, data);
}
