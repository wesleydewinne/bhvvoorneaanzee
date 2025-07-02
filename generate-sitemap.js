// generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import publicRoutes from './src/routes/publicRoutes.jsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = 'https://www.bhvvoorneaanzee.nl';

(async () => {
    const sitemap = new SitemapStream({ hostname });
    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'dist', 'sitemap.xml'));
    sitemap.pipe(writeStream);

    publicRoutes.forEach(({ path: routePath }) => {
        sitemap.write({
            url: routePath,
            changefreq: 'weekly',
            priority: routePath === '/' ? 1.0 : 0.8,
            lastmod: new Date().toISOString()
        });
    });

    sitemap.end();
    await streamToPromise(sitemap);
    console.log('✅ Sitemap gegenereerd in dist/sitemap.xml');
})();
