const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const html = fs.readFileSync('pdp-v4.html', 'utf8');

test('PDP 3D loads the cleaned production frame sequence and hides its loader', () => {
  assert.match(html, /frames3d:\{ dir:'3d-sequence-prod\/', count:97 \}/);
  assert.match(html, /\.v3d__load\[hidden\]\{display:none\}/);
  assert.match(html, /im\.src = spec\.dir \+ 'frame_' \+ String\(i \+ 1\)\.padStart\(4, '0'\) \+ '\.webp'/);
});
