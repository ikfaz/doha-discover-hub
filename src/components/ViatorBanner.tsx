import { useEffect, useRef } from 'react';

const ViatorBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('data-vi-partner-id', 'P00290081');
    widgetDiv.setAttribute('data-vi-widget-ref', 'W-a029452c-11cd-40b1-a70b-255a8b3834a0');
    widgetDiv.setAttribute('data-vi-search-term', 'Doha');
    containerRef.current.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://www.viator.com/orion/partner/widget.js';
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
