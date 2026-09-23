const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const root = path.resolve(__dirname, '../out');
const port = Number(process.env.PORT || 3000);
if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Build the site first with pnpm build.');
  process.exit(1);
}
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2' };
http.createServer((req, res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '0.0.0.0', () => console.log(`Static preview: http://localhost:${port}`));
