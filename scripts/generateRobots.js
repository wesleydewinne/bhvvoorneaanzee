import fs from "fs";
import path from "path";
import { PRIVATE_PATHS, QUIZ_PATHS } from "../src/app/routes/routePaths.js";

const disallowRules = [...PRIVATE_PATHS, ...QUIZ_PATHS]
    .map(p => `Disallow: ${p}`)
    .join("\n");

const sitemapUrl = "https://bhvvoorneaanzee.nl/sitemap.xml";

const template = fs.readFileSync("scripts/robots.template.txt", "utf-8");

const output = template
    .replace("{{DISALLOW_RULES}}", disallowRules)
    .replace("{{SITEMAP_URL}}", sitemapUrl);

const outputPath = path.resolve("public/robots.txt");
fs.writeFileSync(outputPath, output);

console.log("robots.txt generated");
