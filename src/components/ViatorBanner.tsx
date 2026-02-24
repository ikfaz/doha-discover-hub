import { useEffect, useRef } from 'react';

const ViatorBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any previous content
    containerRef.current.innerHTML = '';

    // Create widget div
    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('data-vi-partner-id', 'P00290081');
    widgetDiv.setAttribute('data-vi-widget-ref', 'W-a029452c-11cd-40b1-a70b-255a8b3834a0');
    widgetDiv.setAttribute('data-vi-search-term', 'Doha');
    containerRef.current.appendChild(widgetDiv);

    // Load script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.viator.com/orion/partner/widget.js';
    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      script.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full" />;
};

export default ViatorBanner;
