import fs from "fs";
import path from "path";
import { SITEMAP_PATHS } from "../src/routes/sitemapPaths.js";

const DOMAIN = "https://bhvvoorneaanzee.nl";
const OUTPUT_DIR = path.resolve("public");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "sitemap.xml");

// Huidige datum in ISO formaat (YYYY-MM-DD)
const today = new Date().toISOString().split("T")[0];

function generateSitemap() {
    const urls = SITEMAP_PATHS.map(route => {
        return `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;

    // Zorg dat public bestaat
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, sitemap.trim(), "utf8");

    console.log("✅ sitemap.xml succesvol gegenereerd in /public");
    console.log(`📄 Aantal URL's: ${SITEMAP_PATHS.length}`);
}

generateSitemap();
