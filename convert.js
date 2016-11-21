/** REQUIRES **/

var marked  = require('marked'),
    textile = require('textile-js'),
    asdoc   = require('asciidoctor.js')();


/** CONFIGURATION **/

var converters = {};


/** EXPORTS **/

module.exports = convert;


/** CORE **/

function convert(type, text, opts) {
  type = type.trim();
  if (!(type in converters)) throw new Error('Unsupported converter: ' + type);

  if (!opts) opts = {};
  return converters[type](text, opts);
}


/** HELPERS **/

function register(types, converter) {
  if (!Array.isArray(types)) types = [types];

  types.forEach(function (type) {
    converters[type] = converter;
  });
}


/** CONVERTERS **/

register('markdown mdown mkdn md'.split(' '), marked);
register('textile', textile);
register('asciidoc adoc asc'.split(' '), (function () {
  var Opal        = asdoc.Opal,
      AsciiDoctor = asdoc.Asciidoctor;

  var processor = AsciiDoctor(true);

  Opal.Asciidoctor.Compliance.unique_id_start_index = 1;

  var options = Opal.hash2(['safe', 'attributes'], {
    safe: Opal.Symbol.$new('secure'),
    attributes: [
      'showtitle=@', 'idprefix', 'idseparator=-', 'env=github',
      'env-github', 'source-highlighter=html-pipeline'
    ]
  });

  return function (text) {
    return processor.$convert(text, options);
  };
})());
