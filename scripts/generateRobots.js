import fs from "fs";
import path from "path";

import privateRoutes from "../src/routes/privateRoutes.jsx";
import quizRoutes from "../src/routes/quizRoutes.jsx";

const privateDisallows = privateRoutes.map(r => `Disallow: ${r.path}`);
const quizDisallows = quizRoutes.map(r => `Disallow: ${r.path}`);

const disallowRules = [...privateDisallows, ...quizDisallows].join("\n");

const sitemapUrl = "https://bhvvoorneaanzee.nl/sitemap.xml";

const template = fs.readFileSync("scripts/robots.template.txt", "utf-8");

const output = template
    .replace("{{DISALLOW_RULES}}", disallowRules)
    .replace("{{SITEMAP_URL}}", sitemapUrl);

const outputPath = path.resolve("public/robots.txt");
fs.writeFileSync(outputPath, output);

console.log("robots.txt generated");
