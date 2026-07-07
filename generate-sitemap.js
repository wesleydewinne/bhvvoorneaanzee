import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "https://bhvvoorneaanzee.nl";

const sitemapRoutes = [
    "/",
    "/landingpage",
    "/bhv",
    "/bhv-basis-2-daagse",
    "/bhv-basis-e-learning",
    "/bhv-herhaling-1-dag",
    "/bhv-herhaling-e-learning",
    "/bhv-ritme",
    "/ehbo",
    "/ehbo-basis-3-daagse",
    "/ehbo-basis-2-daagse-met-elearning",
    "/ehbo-herhaling-hele-dag",
    "/ehbo-herhaling-halve-dag",
    "/ploegleider",
    "/ploegleider-basis-2-daagse",
    "/ploegleider-basis-1-dag-met-elearning",
    "/ploegleider-herhaling-halve-dag",
    "/ontruimingsoefening",
    "/ontruimingsoefening-fase0",
    "/ontruimingsoefening-fase1",
    "/ontruimingsoefening-fase2",
    "/ontruimingsoefening-fase3",
    "/ontruimingsoefening-fase4",
    "/ontruimingsoefening-fases",
    "/ontruimingsoefening-scenarios",
    "/ontruimingsoefening-verslag",
    "/workshops",
    "/workshops-kleine-blusmiddelen",
    "/workshops-bedienaar-brandmeldcentrale",
    "/workshops-portofoongebruik",
    "/workshops-reanimatie-volwassene",
    "/workshops-reanimatie-kind-baby",
    "/workshops-stop-de-bloeding",
    "/workshops-waterongevallen",
    "/workshops-kinder-ehbo-huiskamertraining",
    "/maatwerk",
    "/modulaire-trainen",
    "/modulair-overzicht",
    "/rotterdam-rijnmond",
    "/zeeland",
    "/den-haag-westland",
    "/blog",
    "/veiligheidscheck",
    "/veelgestelde-vragen",
    "/offerte",
    "/over-ons",
    "/bedrijfsgegevens",
    "/contact",
];

const priorityByPath = {
    "/": 1.0,
    "/landingpage": 0.6,
    "/bhv-ritme": 0.7,
    "/ontruimingsoefening-fase0": 0.6,
    "/ontruimingsoefening-fase1": 0.6,
    "/ontruimingsoefening-fase2": 0.6,
    "/ontruimingsoefening-fase3": 0.6,
    "/ontruimingsoefening-fase4": 0.6,
    "/ontruimingsoefening-fases": 0.5,
    "/ontruimingsoefening-scenarios": 0.5,
    "/ontruimingsoefening-verslag": 0.5,
    "/workshops-kleine-blusmiddelen": 0.7,
    "/workshops-bedienaar-brandmeldcentrale": 0.7,
    "/workshops-portofoongebruik": 0.7,
    "/workshops-reanimatie-volwassene": 0.7,
    "/workshops-reanimatie-kind-baby": 0.7,
    "/workshops-stop-de-bloeding": 0.7,
    "/workshops-waterongevallen": 0.7,
    "/workshops-kinder-ehbo-huiskamertraining": 0.7,
    "/maatwerk": 0.7,
    "/modulaire-trainen": 0.6,
    "/modulair-overzicht": 0.6,
    "/rotterdam-rijnmond": 0.6,
    "/zeeland": 0.6,
    "/den-haag-westland": 0.6,
    "/blog": 0.7,
    "/veiligheidscheck": 0.6,
    "/veelgestelde-vragen": 0.6,
    "/over-ons": 0.6,
    "/bedrijfsgegevens": 0.4,
    "/contact": 0.6,
};

async function generateSitemap() {
    const outputPath = path.resolve(__dirname, "public", "sitemap.xml");
    const lastmod = new Date().toISOString();
    const urls = sitemapRoutes.map((routePath) => {
        const loc = routePath === "/" ? hostname : `${hostname}${routePath}`;
        const changefreq = routePath === "/blog" ? "weekly" : "monthly";
        const priority = priorityByPath[routePath] ?? 0.8;

        return [
            "  <url>",
            `    <loc>${loc}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${changefreq}</changefreq>`,
            `    <priority>${priority.toFixed(1)}</priority>`,
            "  </url>",
        ].join("\n");
    });
    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        "</urlset>",
        "",
    ].join("\n");

    fs.writeFileSync(outputPath, xml, "utf8");
    console.log(`Sitemap gegenereerd in ${outputPath}`);
}

generateSitemap();
