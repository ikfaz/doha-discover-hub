import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://experiencedoha.com';

const generateRobots = () => {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  console.log('robots.txt generated at public/robots.txt');
};

generateRobots();