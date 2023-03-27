const fs = require('fs');

const readFile = url => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      data && resolve(data) || reject(err);
    });
  });
};

const replaceString = (str, reg, replaceValue) => {
  return str.replace(reg, function() {
    return replaceValue;
  });
};

module.exports = async function build() {
  const now = Date.now();
  const path = './wordpress/web/app/plugins/wp-cegos-ecommerce-dashboard/admin/partials';
  let indexFile = await readFile('./static/build.html');
  let pagesFile = await readFile('./src/index.js');
  let js = await readFile('./static/js/bundle.js');
  if (!indexFile)
    process.exit(1);

  const JSTagRegex = /<script src="\/static\/js\/(\w+.\w+.chunk.js)"><\/script>/gm;
  const regex = /Data\["(.*)"\]/gm;
  const jsMatch = [...indexFile.matchAll(JSTagRegex)];
  const htmlMatch = [...indexFile.matchAll(/<body>([\s\S]*)<\/body>/g)];
  const [pagesMatch] = [...pagesFile.matchAll(regex)];
  let htmlFile;
  htmlFile = `${htmlMatch[0][1].trim()}`;
  let jsFile;
  for (let match of jsMatch) {
    if (match[1].startsWith('main')) {
      let current = await readFile('./static/static/js/' + match[1]);
      current = current.toString();
      htmlFile += `<script async>${current}</script>`;
    } else {
      fs.copyFile('./static/static/js/' + match[1], `${path}/index.js`, (err) => {
        if (err) throw err;
        console.log('JS file copied');
      });
    }
    htmlFile = htmlFile.replace(match[0], '');
  }
  htmlFile += `<script>${js}</script>`;;
  fs.writeFile(`${path}/wp-kmaoulida-dashboard-${pagesMatch[1].toLowerCase()}.php`, htmlFile, 'utf8', (err) => {
    if (err) throw err;
    console.log(`HTML file copied in ${path}/wp-kmaoulida-dashboard-${pagesMatch[1].toLowerCase()}.php`);
  });
  fs.writeFile(`./livraison/wp-kmaoulida-dashboard-${pagesMatch[1].toLowerCase()}.html`, htmlFile, 'utf8', (err) => {
    if (err) throw err;
    console.log(`HTML file copied in ./livraison/wp-kmaoulida-dashboard-${pagesMatch[1].toLowerCase()}.html`);
  });
}
