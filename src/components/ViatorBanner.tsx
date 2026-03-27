import { useEffect, useRef } from 'react';

const ViatorBanner = () => {
  const containerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div
            data-vi-partner-id="P00290081"
            data-vi-widget-ref="W-a029452c-11cd-40b1-a70b-255a8b3834a0"
            data-vi-search-term="Doha"
          ></div>
          <script async src="https://www.viator.com/orion/partner/widget.js"><\/script>
        </body>
      </html>
    `;

    const iframe = containerRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }

    // Auto-resize iframe to content height
    const resizeObserver = new ResizeObserver(() => {
      if (doc?.body) {
        iframe.style.height = doc.body.scrollHeight + 'px';
      }
    });

    const checkHeight = setInterval(() => {
      if (doc?.body && doc.body.scrollHeight > 50) {
        iframe.style.height = doc.body.scrollHeight + 'px';
      }
    }, 500);

    if (doc?.body) {
      resizeObserver.observe(doc.body);
    }

    return () => {
      clearInterval(checkHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={containerRef}
      className="w-full border-0"
      style={{ minHeight: '400px' }}
      title="Viator Tours Widget"
    />
  );
};

export default ViatorBanner;
