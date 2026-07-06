#!/usr/bin/env node
// Export a design-master slide deck (HTML) to PPTX.
//
// Usage: node tools/export-pptx.mjs <deck.html> [output.pptx]
//
// Each slide is rendered in headless Chromium at 1280×720 (2x scale) and
// inserted as a full-bleed image on a 16:9 PPTX slide — WYSIWYG with the
// browser preview. Slide headings are added as speaker notes so the file
// stays searchable. Requires the deck to expose the template contract:
// <meta name="doc-type" content="deck"> and window.__deck = {count, goTo}.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [input, output] = process.argv.slice(2);
if (!input) {
  console.error('Usage: node tools/export-pptx.mjs <deck.html> [output.pptx]');
  process.exit(1);
}
const inPath = resolve(input);
if (!existsSync(inPath)) {
  console.error(`Input not found: ${inPath}`);
  process.exit(1);
}
const outPath = resolve(output ?? inPath.replace(/\.html?$/i, '') + '.pptx');

let chromium, PptxGenJS;
try {
  ({ chromium } = await import('playwright'));
  ({ default: PptxGenJS } = await import('pptxgenjs'));
} catch {
  console.error('Dependencies missing. Run: npm install');
  process.exit(1);
}

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.error(String(err.message ?? err));
  console.error('\nChromium is missing. Run: npx playwright install chromium');
  process.exit(1);
}

try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  });
  await page.goto(pathToFileURL(inPath).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Hide on-screen chrome (progress bar, page counter) — it isn't slide content.
  await page.addStyleTag({
    content: '#deck-progress, #deck-pagenum { display: none !important; }',
  });

  const hasDeckApi = await page.evaluate(
    () => typeof window.__deck === 'object' && typeof window.__deck.goTo === 'function'
  );
  if (!hasDeckApi) {
    console.error(
      'This file is not a design-master deck (window.__deck API missing).\n' +
        'Decks must follow the template contract in .agents/skills/design-slides/resources/deck-template.html.'
    );
    process.exit(1);
  }

  const count = await page.evaluate(() => window.__deck.count);
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'W16x9', width: 10, height: 5.625 });
  pptx.layout = 'W16x9';

  for (let i = 0; i < count; i++) {
    await page.evaluate((n) => window.__deck.goTo(n), i);
    await page.waitForTimeout(120);
    const png = await page.screenshot({
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    });
    const note = await page.evaluate((n) => {
      const el = document.querySelectorAll('.slide')[n];
      const h = el?.querySelector('h1, h2, h3');
      return (h?.textContent ?? '').trim();
    }, i);
    const slide = pptx.addSlide();
    slide.addImage({
      data: 'image/png;base64,' + png.toString('base64'),
      x: 0,
      y: 0,
      w: 10,
      h: 5.625,
    });
    if (note) slide.addNotes(note);
    process.stdout.write(`\rslide ${i + 1}/${count}`);
  }
  process.stdout.write('\n');

  await pptx.writeFile({ fileName: outPath });
  console.log(`PPTX: ${count} slides → ${outPath}`);
} finally {
  await browser.close();
}
