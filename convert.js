/** REQUIRES **/

var marked = require('marked');


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
