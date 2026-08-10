import { useCallback, useEffect, useState } from 'react';
import { GoogleReviews } from './components/GoogleReviews';
import { Hero } from './components/Hero';
import { QuoteForm } from './components/QuoteForm';
import { ServiceAreas } from './components/ServiceAreas';
import { Services } from './components/Services';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { StickyMobileCta } from './components/StickyMobileCta';
import { TrustStrip } from './components/TrustStrip';
import { WhyJdc } from './components/WhyJdc';
import { WorkGallery } from './components/WorkGallery';
import { initAnalytics } from './lib/analytics';
import { localBusinessStructuredData } from './lib/structuredData';

export default function App() {
  const [verifiedRating, setVerifiedRating] = useState<{ rating: number; userRatingCount: number } | null>(null);
  const updateRating = useCallback((rating: { rating: number; userRatingCount: number } | null) => setVerifiedRating(rating), []);

  useEffect(() => initAnalytics(), []);
  useEffect(() => {
    const id = 'jdc-local-business-schema';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(localBusinessStructuredData(verifiedRating));
  }, [verifiedRating]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <WhyJdc />
        <GoogleReviews onVerifiedRating={updateRating} />
        <WorkGallery />
        <ServiceAreas />
        <QuoteForm />
      </main>
      <SiteFooter />
      <StickyMobileCta />
    </>
  );
}
