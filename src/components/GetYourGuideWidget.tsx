import { useEffect, useRef } from 'react';

const GetYourGuideWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      script.remove();
    };
  }, []);

  return (
    <div className="my-8">
      <div ref={containerRef} />
    </div>
  );
};

export default GetYourGuideWidget;
