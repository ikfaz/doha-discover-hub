import { useEffect, useRef } from 'react';

const ViatorBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bannerDiv = document.createElement('div');
    bannerDiv.setAttribute('data-id', 'viator-banner');
    bannerDiv.setAttribute('data-partner-id', 'P00290081');
    bannerDiv.setAttribute('data-url', 'https://www.viator.com/Doha/d4453-ttd');
    bannerDiv.setAttribute('data-banner-width', '728');
    bannerDiv.setAttribute('data-banner-height', '90');
    bannerDiv.setAttribute('data-banner-language', 'en');
    bannerDiv.setAttribute('data-banner-selection', 'banner1');
    containerRef.current.appendChild(bannerDiv);

    const script = document.createElement('script');
    script.src = 'https://partners.vtrcdn.com/static/scripts/banners/banners.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      script.remove();
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-6">
      <div ref={containerRef} />
    </div>
  );
};

export default ViatorBanner;
