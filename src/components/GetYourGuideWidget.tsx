import { useEffect, useRef } from 'react';

const GYG_SCRIPT_ID = 'gyg-partner-script';
const GYG_SCRIPT_URL = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';

const GetYourGuideWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GYG script if not already present
    if (!document.getElementById(GYG_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GYG_SCRIPT_ID;
      script.src = GYG_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-gyg-partner-id', '68DXBIL');
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.setAttribute('data-gyg-href', 'https://widget.getyourguide.com/default/city.frame');
    widgetDiv.setAttribute('data-gyg-location-id', '1885');
    widgetDiv.setAttribute('data-gyg-locale-code', 'en-US');
    widgetDiv.setAttribute('data-gyg-widget', 'city');
    widgetDiv.setAttribute('data-gyg-partner-id', '68DXBIL');
    containerRef.current.appendChild(widgetDiv);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="my-8">
      <div ref={containerRef} />
    </div>
  );
};

export default GetYourGuideWidget;
