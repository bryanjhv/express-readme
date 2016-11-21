var fs      = require('fs'),
    path    = require('path'),
    cssPath = require.resolve('github-markdown-css'),
    convert = require('./convert');


// Configuration

var tplPath = path.join(__dirname, 'template.html'),
    tplText, cssText;

var defaultOpts = {
  routes:        '/',
  filename:      'README.md',
  processorOpts: {}
};


/**
 * Setup app routes for serving a README.
 *
 * This method is in charge of setting up the right routes in
 * your Express app to serve the README you specified, and also
 * rendering it using the markup processor it needs, ensuring it
 * is present, and other things.
 *
 * @param {*} app - The Express app.
 * @param {object} [opts] - Options you want.
 * @param {string} [opts.filename] - The filename to render.
 * @param {(string|string[])} [opts.routes] - The routes to serve.
 * @param {object} [opts.processorOpts] - Options for processor.
 */
module.exports = function expressReadme(app, opts) {
  // Fetch options
  if (!opts) opts = {};
  var routes   = opts.routes || defaultOpts.routes;
  var filename = opts.filename || defaultOpts.filename;
  if (!Array.isArray(routes)) routes = [routes];
  var procOpts = opts.processorOpts || defaultOpts.processorOpts;

  // Setup routes
  routes.forEach(function (route) {
    app.get(route, function (req, res) {
      var exists = fs.existsSync(filename);
      if (!exists) return res.sendStatus(404);

      var info = path.parse(filename);

      var text    = fs.readFileSync(filename, 'utf8'),
          type    = info.ext.substr(1),
          content = convert(type, text, procOpts),
          html    = tplText.substr(0);

      html = html.replace('{{content}}', content);
      html = html.replace('{{filename}}', info.base);

      res.status(200).type('html').end(html);
    });
  });
};


// Reading

tplText = fs.readFileSync(tplPath, 'utf8');
cssText = fs.readFileSync(cssPath, 'utf8');

tplText = tplText.replace('{{styles}}', cssText);
