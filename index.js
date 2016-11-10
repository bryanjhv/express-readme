/** REQUIRES **/

var fs       = require('fs'),
    path     = require('path'),
    cssPath  = require.resolve('github-markdown-css'),
    convert  = require('./convert');


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
      var exists = fs.existsSync(filename);
      if (!exists) return res.sendStatus(404);

      var info = path.parse(filename);

      var text    = fs.readFileSync(filename, 'utf8'),
          type    = info.ext.substr(1),
          content = convert(type, text);

      var html = tplText.substr(0);
      html = html.replace('{{content}}', content);
      html = html.replace('{{filename}}', info.base);

      res.status(200).type('html').end(html);
    });
  });
}


/** READING **/

tplText = fs.readFileSync(tplPath, 'utf8');
cssText = fs.readFileSync(cssPath, 'utf8');

tplText = tplText.replace('{{styles}}', cssText);
