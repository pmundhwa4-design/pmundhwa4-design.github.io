const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../site');
for (const page of ['index', 'services', 'journey', 'tools', 'about', 'contact']) {
  const html = fs.readFileSync(path.join(root, page + '.html'), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, page + ': one main heading');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const url = new URL(href, 'https://local/' + page + '.html');
    const file = path.join(root, decodeURIComponent(url.pathname));
    assert(fs.existsSync(file), page + ': missing ' + href);
    if (url.hash && file.endsWith('.html')) {
      assert(fs.readFileSync(file, 'utf8').includes('id="' + url.hash.slice(1) + '"'), page + ': missing anchor ' + href);
    }
  }
}
new vm.Script(fs.readFileSync(path.join(root, 'assets/site.js'), 'utf8'));
console.log('Validated six pages, local links/assets, anchors, and JavaScript syntax.');
