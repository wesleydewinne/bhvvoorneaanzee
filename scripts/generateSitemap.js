import fs from "fs";
import path from "path";
import { SITEMAP_PATHS } from "../src/routes/sitemapPaths.js";

const DOMAIN = "https://bhvvoorneaanzee.nl";

// Sitemap XML genereren
function generateSitemap() {
    const urls = SITEMAP_PATHS.map(route => {
        return `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;

    const outputDir = path.resolve("public");
    const outputPath = path.join(outputDir, "sitemap.xml");

    // Zorg dat public bestaat
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, sitemap, "utf8");

    console.log("✅ sitemap.xml gegenereerd in /public");
}

generateSitemap();
