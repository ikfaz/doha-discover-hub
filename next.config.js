/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  /**
   * Security Headers Configuration
   * This function sets HTTP response headers for all routes to harden security.
   */
  async headers() {
    // Define the Content Security Policy (CSP)
    // This restricts where resources (scripts, images, etc.) can be loaded from.
    const cspHeader = `
      default-src 'self';
      script-src 'self' https://www.google-analytics.com https://maps.googleapis.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://cdn.experiencedoha.com;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `;

    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            // Force HTTPS for 2 years (63072000 seconds), include subdomains, and allow preloading
            // Prevents Man-in-the-Middle (MitM) attacks and protocol downgrade attacks
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Prevent the browser from MIME-sniffing a response away from the declared content-type
            // Reduces exposure to drive-by download attacks
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Prevent the site from being embedded in an iframe (Clickjacking protection)
            // 'DENY' is the strictest setting; use 'SAMEORIGIN' if you need to iframe your own pages
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Control how much referrer information is sent with requests
            // 'strict-origin-when-cross-origin' sends full URL to same origin, but only domain to others
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Apply the CSP defined above (removing newlines to make it a valid header string)
            // Mitigates Cross-Site Scripting (XSS) and data injection attacks
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;