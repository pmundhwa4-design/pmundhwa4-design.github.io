const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../site');
const template = fs.readFileSync(path.join(root, 'about.html'), 'utf8');
const content = fs.readFileSync(path.join(__dirname, 'careers-content.html'), 'utf8');
let careers = template.replace(/<main id="main">[\s\S]*?<\/main>/, '<main id="main">'+content+'</main>');
careers = careers.replace(/href="#(about|values|why)"/g,'href="about.html#$1"');
careers = careers.replace(/<title>.*?<\/title>/, '<title>Careers — Strategies Studio</title>')
  .replace(/(<meta property="og:title" content=")[^"]+/, '$1Careers — Strategies Studio')
  .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]+/g, '$1Explore careers at Strategies Studio. Check back for vacancies, role details and application instructions.');
fs.writeFileSync(path.join(root, 'careers.html'), careers);
for(const name of fs.readdirSync(root).filter(n=>n.endsWith('.html'))){
  let html=fs.readFileSync(path.join(root,name),'utf8');
  html=html.replace(/(<nav class="nav-links"[^>]*>)([\s\S]*?)(<\/nav>)/,(_,a,b,c)=>a+b.replace(/<a href="careers.html">Careers<\/a>/g,'')+'<a href="careers.html">Careers</a>'+c);
  html=html.replace(/(<div class="drawer"[^>]*>)([\s\S]*?)(<\/div>)/,(_,a,b,c)=>a+b.replace(/<a class="big" href="careers.html">Careers<\/a>/g,'').replace('<a class="btn btn-gold"','<a class="big" href="careers.html">Careers</a><a class="btn btn-gold"')+c);
  html=html.replace(/<li><a href="careers.html">Careers<\/a><\/li>/g,'').replace('<h4>Company</h4><ul>','<h4>Company</h4><ul><li><a href="careers.html">Careers</a></li>');
  fs.writeFileSync(path.join(root,name),html);
}
const cssPath=path.join(root,'assets/site.css');
const base=fs.readFileSync(cssPath,'utf8').split('/* Professional polish and careers */')[0];
fs.writeFileSync(cssPath,base+fs.readFileSync(path.join(__dirname,'careers.css'),'utf8'));
console.log('Careers and shared UI refinements applied.');

