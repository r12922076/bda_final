#!/usr/bin/env node
/* Static frontend smoke test for PineGuard GitHub Pages artifact.
   This test intentionally uses only Node built-ins so graders do not need npm install. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const failures = [];
function read(rel){ return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function mustFile(rel){ if(!fs.existsSync(path.join(ROOT, rel))) failures.push(`missing file: ${rel}`); }
function mustContain(name, text, needle){ if(!text.includes(needle)) failures.push(`${name} missing: ${needle}`); }

const requiredFiles = [
  'docs/index.html',
  'docs/assets/app.js',
  'docs/assets/components.js',
  'docs/assets/router.js',
  'docs/assets/scoring.js',
  'docs/assets/style.css',
  'docs/assets/favicon.svg',
  'docs/data/pineguard_static_data.json',
  'docs/grader_guide.md',
  'docs/data_lineage.md',
  'docs/data_contract.md'
];
requiredFiles.forEach(mustFile);

const index = read('docs/index.html');
const app = read('docs/assets/app.js');
const scoring = read('docs/assets/scoring.js');
const data = JSON.parse(read('docs/data/pineguard_static_data.json'));

for (const route of ['home','tour','health-check','diagnosis','strategy-profile','monitor','evidence','report','pricing','architecture','risk','docs']) {
  mustContain('app.js', app, `PG.register("${route}"`);
}
for (const navRoute of ['home','tour','health-check','monitor','evidence','report','pricing','architecture','risk','docs']) {
  mustContain('index.html navigation', index, `#/${navRoute}`);
}

for (const key of ['templates','prices','alerts','evidence','evidenceStrength','graderTour','productionLayers','riskControls','scaleEconomics']) {
  if (!Array.isArray(data[key]) || data[key].length === 0) failures.push(`pineguard_static_data.json missing or empty array: ${key}`);
}

for (const row of data.evidence || []) {
  for (const field of ['url','source_type','pain_category','evidence_strength','evidence_role']) {
    if (!(field in row)) failures.push(`evidence row missing field: ${field}`);
  }
}

for (const script of ['./assets/components.js','./assets/scoring.js','./assets/router.js','./assets/app.js']) {
  mustContain('index.html', index, script);
}

mustContain('scoring.js', scoring, 'function deepMerge');
mustContain('app.js', app, 'function tour()');
mustContain('app.js', app, 'Evidence strength');
mustContain('index.html', index, 'favicon.svg');

if (failures.length) {
  console.error('FRONTEND SMOKE TEST FAILED');
  failures.forEach(f => console.error('-', f));
  process.exit(1);
}
console.log('FRONTEND SMOKE TEST PASSED');
console.log(`Routes tested: 12`);
console.log(`Evidence rows: ${data.evidence.length}`);
console.log(`Templates: ${data.templates.length}`);
