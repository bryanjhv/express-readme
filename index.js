/** REQUIRES **/

var fs       = require('fs'),
    path     = require('path'),
    markdown = require('marked'),
    cssPath  = require.resolve('github-markdown-css');


/** CONFIGURATION **/

var tplPath = path.join(__dirname, 'template.html'),
    tplText, cssText;

var defaultOpts = {
  routes:   '/',
  filename: 'README.md'
};


/** EXPORTS **/

module.exports = expressReadme;


/** CORE **/

function expressReadme(app, opts) {
  // Fetch options
  if (!opts) opts = {};
  var routes   = opts.routes || defaultOpts.routes;
  var filename = opts.filename || defaultOpts.filename;
  if (!Array.isArray(routes)) routes = [routes];

  routes.forEach(function (route) {
    app.get(route, function (req, res) {
      var html = tplText.substr(0);
      html = html.replace('{{filename}}', path.basename(filename));

      var exists = fs.existsSync(filename);
      if (!exists) return res.sendStatus(404);

      var content = markdown(fs.readFileSync(filename, 'utf8'));
      html = html.replace('{{content}}', content);
      res.status(200).type('html').end(html);
    });
  });
}


/** READING **/

tplText = fs.readFileSync(tplPath, 'utf8');
cssText = fs.readFileSync(cssPath, 'utf8');

tplText = tplText.replace('{{styles}}', cssText);
