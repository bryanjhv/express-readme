var marked  = require('marked'),
    textile = require('textile-js'),
    asdoc   = require('asciidoctor.js')();


/**
 * Holds available converters.
 *
 * @type {object}
 */
var converters = {};


/**
 * Converts given text to HTML markup.
 *
 * This method just maps the given type and text in the list of
 * available converters, then calls the method returning the
 * rendered markup as a HTML string.
 *
 * @param {string} type - The markup type.
 * @param {string} text - The text to convert.
 * @param {object} [opts] - Options for processor.
 * @returns {string} The rendered HTML markup.
 * @throws {Error} If markup is not supported.
 */
module.exports = function convert(type, text, opts) {
  if (!(type in converters)) throw new Error('Unsupported converter: ' + type);

  if (!opts) opts = {};
  return converters[type](text, opts);
};


/**
 * Register a converter.
 *
 * Takes a string, splits by spaces (in case a given markup can
 * have multiple extensions), and maps the method in the available
 * converters list.
 *
 * @param {string} types - The markup types (extensions).
 * @param {function(string, object)} converter - Markup converter.
 */
function register(types, converter) {
  types.split(' ').forEach(function (type) {
    converters[type] = converter;
  });
}


// Converters

register('markdown mdown mkdn md', marked);

register('textile', textile);

register('asciidoc adoc asc', (function () {
  var Opal        = asdoc.Opal,
      AsciiDoctor = asdoc.Asciidoctor;

  var processor = AsciiDoctor(true);

  Opal.Asciidoctor.Compliance.unique_id_start_index = 1;

  var options = Opal.hash2(['safe', 'attributes'], {
    safe:       Opal.Symbol.$new('secure'),
    attributes: [
      'showtitle=@', 'idprefix', 'idseparator=-', 'env=github',
      'env-github', 'source-highlighter=html-pipeline'
    ]
  });

  return function (text) {
    return processor.$convert(text, options);
  };
})());
