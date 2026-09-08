const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const html = fs.readFileSync('pdp-v4.html', 'utf8');

test('PDP 3D loads the cleaned production frame sequence and hides its loader', () => {
  assert.match(html, /frames3d:\{ dir:'3d-sequence-prod\/', count:97 \}/);
  assert.match(html, /\.v3d__load\[hidden\]\{display:none\}/);
  assert.match(html, /im\.src = spec\.dir \+ 'frame_' \+ String\(i \+ 1\)\.padStart\(4, '0'\) \+ '\.webp'/);
});

test('PDP home links target the deployed index page', () => {
  assert.match(html, /class="hd__logo" href="index\.html"/);
  assert.match(html, /class="stickyhd__logo" href="index\.html"/);
  assert.doesNotMatch(html, /href="homepage-v4\.html/);
});

test('PDP model view references an image that is included in the site', () => {
  const match = html.match(/model:'([^']+)'/);
  assert.ok(match, 'a model-view image path is configured');
  assert.ok(fs.existsSync(match[1]), `${match[1]} is included in the site`);
});
