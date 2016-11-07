/**
 * REQUIRES
 */

var fs        = require('fs'),
    marked    = require('marked'),
    githubCss = require.resolve('github-markdown-css');


/**
 * CONFIGURATION
 */

var template = __dirname + '/readme.html';

var defaultOptions = {
  routes: '/',
  filename: 'README.md'
};


/**
 * EXPORTS
 */

module.exports = expressReadme;

function expressReadme(app, options) {
  // Fetch options
  if (!options) options = {};
  var routes = options.routes || defaultOptions.routes;
  var filename = options.filename || defaultOptions.filename;
  if (!Array.isArray(routes)) routes = [routes];

  // Read things
  var html = fs.readFileSync(template, 'utf8');
  var css  = fs.readFileSync(githubCss, 'utf8');

  // Replace things
  html = html.replace('{{ filename }}', filename);
  html = html.replace('{{ githubCss }}', css);

  // Setup routes
  routes.forEach(function (route) {
    app.get(route, function (req, res) {
      // Markdown -> HTML
      var content = marked(fs.readFileSync(filename, 'utf8'));

      // Replace content
      html = html.replace('{{ content }}', content);

      // Serve
      res.status(200).type('html').end(html);
    });
  });
}
