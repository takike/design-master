#!/usr/bin/env node
// Export a design-master HTML deliverable to PDF.
//
// Usage: node tools/export-pdf.mjs <input.html> [output.pdf]
//
// The page mode is read from <meta name="doc-type" content="...">:
//   "deck"     → 1280×720 pages, one slide per page (deck print CSS)
//   "document" → A4, honoring the file's own @page rule
//   (missing)  → treated as "document"
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [input, output] = process.argv.slice(2);
if (!input) {
  console.error('Usage: node tools/export-pdf.mjs <input.html> [output.pdf]');
  process.exit(1);
}
const inPath = resolve(input);
if (!existsSync(inPath)) {
  console.error(`Input not found: ${inPath}`);
  process.exit(1);
}
const outPath = resolve(output ?? inPath.replace(/\.html?$/i, '') + '.pdf');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('playwright is not installed. Run: npm install');
  process.exit(1);
}

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.error(String(err.message ?? err));
  console.error('\nChromium is missing. Run: npx playwright install chromium');
  console.error('(Skip if PLAYWRIGHT_BROWSERS_PATH points at pre-installed browsers.)');
  process.exit(1);
}

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(inPath).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const docType = await page
    .$eval('meta[name="doc-type"]', (el) => el.content)
    .catch(() => 'document');
  await page.emulateMedia({ media: 'print' });

  if (docType === 'deck') {
    await page.pdf({
      path: outPath,
      width: '1280px',
      height: '720px',
      printBackground: true,
      preferCSSPageSize: true,
    });
  } else {
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
  }
  console.log(`PDF (${docType}): ${outPath}`);
} finally {
  await browser.close();
}
