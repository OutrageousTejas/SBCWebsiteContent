#!/usr/bin/env node
// ============================================================
// coaching-sectiontext-to-html.js
//
// Bakes coaching-section-text.json into a coaching section HTML file.
// Replaces the inline COACHING_COPY object and sets USE_REMOTE_COPY=false.
//
// Usage:
//   node coaching-sectiontext-to-html.js <source-html-file>
//
// Example:
//   node coaching-sectiontext-to-html.js coaching-section-v1.0.html
//
// Output:
//   coaching-section-v1.0-built.html  (source file is never modified)
//
// The script locates content between these sentinels in the HTML:
//   // @@COPY_START
//   // @@COPY_END
// and replaces everything between them with the JSON content.
// ============================================================

const fs   = require('fs');
const path = require('path');

// ── Argument validation ──────────────────────────────────────
const sourceFile = process.argv[2];
if (!sourceFile) {
  console.error('ERROR: No source HTML file specified.');
  console.error('Usage: node coaching-sectiontext-to-html.js <source-html-file>');
  process.exit(1);
}
if (!fs.existsSync(sourceFile)) {
  console.error(`ERROR: Source file not found: ${sourceFile}`);
  process.exit(1);
}

const jsonFile = path.join(path.dirname(sourceFile), 'coaching-section-text.json');
if (!fs.existsSync(jsonFile)) {
  console.error(`ERROR: JSON file not found: ${jsonFile}`);
  console.error(`Expected it alongside the HTML file at: ${jsonFile}`);
  process.exit(1);
}

// ── Derive output filename ───────────────────────────────────
// coaching-section-v1.0.html → coaching-section-v1.0-built.html
const ext        = path.extname(sourceFile);
const base       = path.basename(sourceFile, ext);
const outputFile = path.join(path.dirname(sourceFile), `${base}-built${ext}`);

// ── Read inputs ──────────────────────────────────────────────
const htmlContent = fs.readFileSync(sourceFile, 'utf8');
const jsonContent = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// ── Validate sentinels ───────────────────────────────────────
const SENTINEL_START = '// @@COPY_START';
const SENTINEL_END   = '// @@COPY_END';

const startIdx = htmlContent.indexOf(SENTINEL_START);
const endIdx   = htmlContent.indexOf(SENTINEL_END);

if (startIdx === -1) {
  console.error(`ERROR: Sentinel not found in HTML: ${SENTINEL_START}`);
  console.error('Make sure the HTML file has the @@COPY_START / @@COPY_END markers.');
  process.exit(1);
}
if (endIdx === -1) {
  console.error(`ERROR: Sentinel not found in HTML: ${SENTINEL_END}`);
  process.exit(1);
}
if (endIdx <= startIdx) {
  console.error('ERROR: @@COPY_END appears before @@COPY_START in the HTML. Check the file.');
  process.exit(1);
}

// ── Build replacement block ──────────────────────────────────
// Pretty-print the JSON as a JS const assignment.
// Indented 2 spaces to match surrounding script style.
const jsonString = JSON.stringify(jsonContent, null, 2)
  .split('\n')
  .map((line, i) => i === 0 ? line : '  ' + line)  // indent all lines after the first
  .join('\n');

const replacement =
`${SENTINEL_START}
  const USE_REMOTE_COPY = false;  // Set true during development to load from GitHub
  const REMOTE_COPY_URL = 'YOUR_GITHUB_RAW_URL_HERE/coaching-section-text.json';
  const COACHING_COPY = ${jsonString};
  ${SENTINEL_END}`;

// ── Splice into HTML ─────────────────────────────────────────
// Replace from the start of @@COPY_START through the end of @@COPY_END
const before = htmlContent.substring(0, startIdx);
const after  = htmlContent.substring(endIdx + SENTINEL_END.length);
const output = before + replacement + after;

// ── Write output ─────────────────────────────────────────────
fs.writeFileSync(outputFile, output, 'utf8');

console.log('');
console.log('✅ Build complete.');
console.log(`   Source:  ${sourceFile}`);
console.log(`   JSON:    ${jsonFile}`);
console.log(`   Output:  ${outputFile}`);
console.log('');
console.log('Next steps:');
console.log('  1. Open the output file and verify the content looks correct.');
console.log('  2. Paste the contents into your Squarespace code block.');
console.log('');
