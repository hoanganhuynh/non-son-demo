const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');

test('mobile product artwork preserves its intrinsic ratio', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.world__imgwrap img\{[^}]*object-fit:contain/);
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.mood__img img\{[^}]*object-fit:contain/);
});

test('mobile 3D hero uses the same uncropped canvas box as the still product image', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?html\.fluid \.hero__v3d\{inset:0;width:100%;height:100%\}/);
});

test('mobile media and editorial images use stable crops', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.post__bg img[^}]*object-fit:cover/);
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.craft__img img[^}]*object-fit:cover/);
});

test('mobile product cards hide the add-to-cart overlay', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.pcta\{[^}]*display:none/);
});

test('narrow screens cannot create horizontal page overflow', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?body\{[^}]*overflow-x:hidden/);
  assert.match(html, /@media \(max-width:480px\)[\s\S]*?--pad:16px/);
});

test('mobile type scale stays readable in two-column product grids', () => {
  assert.match(html, /\.hero__h1\{font-size:clamp\(34px,9vw,38px\)/);
  assert.match(html, /\.h2[^}]*font-size:clamp\(28px,7\.4vw,32px\)/);
  assert.match(html, /\.pname\{font-size:18px/);
  assert.match(html, /\.pprice\{font-size:14px/);
});

test('both mobile headers provide an accessible menu trigger', () => {
  assert.equal((html.match(/class="iconbtn[^"\n]*menubtn/g) || []).length, 2);
  assert.equal((html.match(/aria-controls="mobileMenu"/g) || []).length, 2);
  assert.equal((html.match(/aria-expanded="false"/g) || []).length, 2);
});

test('mobile navigation uses a native dialog and restores trigger focus', () => {
  assert.match(html, /<dialog[^>]*id="mobileMenu"[^>]*aria-labelledby="mobileMenuTitle"/);
  assert.match(html, /mobileMenu\.showModal\(\)/);
  assert.match(html, /returnFocus\.focus\(\)/);
});

test('mobile help heading removes the forced desktop line break', () => {
  assert.match(html, /<br class="help__break"> chắc chắn hơn\?/);
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.help__break\{display:none\}/);
  assert.match(html, /\.help h2\{width:100%;max-width:18ch;text-wrap:balance\}/);
});

test('mobile worlds become a one-card-plus-peek carousel', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.worlds\{display:flex[^}]*overflow-x:auto/);
  assert.match(html, /\.world\{flex:0 0 82%[^}]*scroll-snap-align:start/);
});

test('mobile categories use a two-column grid without horizontal scrolling', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.cats\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);overflow:visible/);
});

test('menu icon contrasts with both header surfaces', () => {
  assert.match(html, /\.menubtn\{display:none;color:#f4f1ea\}/);
  assert.match(html, /\.menubtn\.iconbtn--dark\{color:#121212\}/);
});

test('mobile filter controls do not render labels below 12px', () => {
  assert.match(html, /\.chip\{height:40px;padding:7px 12px;font-size:12px/);
  assert.match(html, /\.sortbox span\{font-size:12px/);
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.viewall span\{font-size:12px/);
});

test('mobile world cards keep artwork in normal flow above their copy', () => {
  assert.match(html, /\.world__imgwrap\{position:relative;inset:auto;width:100%;height:185px/);
});

test('mobile editorial posts use the same horizontal carousel rhythm', () => {
  assert.match(html, /@media \(max-width:768px\)[\s\S]*?\.posts\{display:flex[^}]*overflow-x:auto/);
  assert.match(html, /\.post\{flex:0 0 82%;min-height:360px/);
});

test('mobile calls to action share a 14px label scale', () => {
  assert.match(html, /\.band__btn span,html\.fluid \.mood__btn2,html\.fluid \.help__b span\{font-size:14px/);
  assert.match(html, /\.band__r p\{font-size:14px/);
});

test('primary mobile calls to action span the available width', () => {
  assert.match(html, /\.hero__cta\{flex-direction:column;align-items:stretch;width:100%\}/);
  assert.match(html, /\.band__btn,html\.fluid \.mood__btn2\{width:100%\}/);
  assert.match(html, /\.help__btns\{flex-direction:column;align-items:stretch\}/);
});

test('mobile product artwork is large and remains uncropped', () => {
  assert.match(html, /\.pmedia__img img\{inset:6% 0;width:100%;height:88%;object-fit:contain\}/);
  assert.match(html, /\.pmedia__img--fit img\.sq82[^}]*width:96%;height:96%;[^}]*object-fit:contain/);
});

test('mobile world cards keep compact vertical rhythm', () => {
  assert.match(html, /\.world\{flex:0 0 82%;min-height:0;padding:18px;gap:8px/);
  assert.match(html, /\.world__txt\{gap:6px;margin-top:0\}/);
});

test('best-seller view-all action is ordered after products on mobile', () => {
  assert.match(html, /\.best-sec \.filterbar,html\.fluid \.best-sec \.filterbar \.end\{display:contents\}/);
  assert.match(html, /\.best-sec \.viewall\{order:5;align-self:center\}/);
});

test('mobile mood choices are compact pills in one horizontal row', () => {
  assert.match(html, /\.mood__list\{display:flex;flex-wrap:nowrap;overflow-x:auto/);
  assert.match(html, /\.mood__btn\{flex:0 0 auto;width:auto;height:40px;padding:7px 12px;border-radius:999px/);
});

test('mobile body copy is 14px and compact text never drops below 10px', () => {
  assert.match(html, /\.lede,html\.fluid \.hero__desc\{font-size:14px/);
  assert.match(html, /\.world__txt p,html\.fluid \.post p\{font-size:14px/);
  assert.match(html, /\.pcat\{font-size:10px/);

  const mobileStart = html.lastIndexOf('@media (max-width:768px)');
  const mobileEnd = html.indexOf('@media (max-width:480px)', mobileStart);
  const mobileCss = html.slice(mobileStart, mobileEnd);
  const pixelSizes = [...mobileCss.matchAll(/font-size:([\d.]+)px/g)].map((match) => Number(match[1]));
  assert.ok(pixelSizes.length > 0);
  assert.ok(pixelSizes.every((size) => size >= 10), `found mobile font sizes below 10px: ${pixelSizes.filter((size) => size < 10).join(', ')}`);
});

test('mobile mood content keeps breathing room above its CTA', () => {
  assert.match(html, /\.mood__btn2\{min-height:48px;padding:13px 16px;margin-top:16px\}/);
});

test('mobile announcement restores full text in a slow seamless loop', () => {
  assert.equal((html.match(/class="announce__copy"/g) || []).length, 2);
  assert.match(html, /\.announce__marquee\{display:flex;width:max-content;animation:announce-scroll 20s linear infinite\}/);
  assert.match(html, /@keyframes announce-scroll\{to\{transform:translateX\(-50%\)\}\}/);
  assert.match(html, /prefers-reduced-motion:reduce[\s\S]*?\.announce__marquee\{animation:none!important;transform:none!important\}/);
});

test('stacking section scroll remains enabled on mobile', () => {
  assert.match(html, /root\.classList\.toggle\('no-stack', !canZoom\)/);
  assert.doesNotMatch(html, /w < STACK_ABOVE/);
});
