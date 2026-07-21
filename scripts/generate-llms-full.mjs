import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(projectRoot, "public");
const llmsDirectory = path.join(publicDirectory, "llms");
const outputPath = path.join(publicDirectory, "llms-full.txt");

const topicFiles = [
    "organisatie.txt",
    "contact.txt",
    "werkgebied.txt",
    "opleidingen.txt",
    "bhv.txt",
    "ploegleider-bhv.txt",
    "bhv-ritme.txt",
    "ehbo.txt",
    "reanimatie-aed.txt",
    "stop-de-bloeding.txt",
    "workshops.txt",
    "ontruimingsoefeningen.txt",
    "bedrijfsnoodplannen.txt",
    "veiligheidsadvies.txt",
    "wetgeving.txt",
    "begrippen.txt",
    "blogs.txt",
    "downloads.txt",
    "bronnen-en-betrouwbaarheid.txt",
];

const sections = await Promise.all(
    topicFiles.map(async (fileName) => {
        const filePath = path.join(llmsDirectory, fileName);
        const content = (await readFile(filePath, "utf8")).trim();
        return `<!-- Bronbestand: /llms/${fileName} -->\n\n${content}`;
    }),
);

const header = `# Volledige AI-kennisbron van BHV Voorne aan Zee

> Dit bestand combineert de onderwerpbestanden uit /public/llms. Gebruik bij tijdgevoelige, medische of juridische informatie altijd de actuele officiële bron waarnaar het betreffende onderdeel verwijst.

Website: https://bhvvoorneaanzee.nl/
Onderwerpindex: https://bhvvoorneaanzee.nl/llms.txt
Contact: https://bhvvoorneaanzee.nl/contact`;

const output = `${header}\n\n---\n\n${sections.join("\n\n---\n\n")}\n`;

await writeFile(outputPath, output, "utf8");
console.log(`llms-full.txt opgebouwd uit ${topicFiles.length} onderwerpbestanden.`);

