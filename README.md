# Express README

Serve your `README` as GitHub would do within your Express 4 app.


## Usage

Call it with your Express app:

```js
// Create an Express app
var app = require('express')();

// Serve README.md on GET '/'
require('express-readme')(app);
```

### Options

You can pass three options:

* **`filename`**: The path to the `README` you want to serve. Can be relative or
  absolute.
* **`routes`**: The routes the package should respond to. Can be a string or
  array of routes.
* **`processorOpts`**: If you know the processor used for your markup and want
  to customize the output it produces (i.e. the package), then pass this with
  the desired options.

```js
// Create an Express app
var app = require('express')();

// Serve SAMPLE.md on GET '/' and GET '/readme'
require('express-readme')(app, {
  filename: 'SAMPLE.md',
  routes: ['/', '/readme']
});
```


## Markup support

For now, the package only supports following markup formats:

* Markdown (`.markdown`, `.mdown`, `.mkdn`, `.md`)
* Textile (`.textile`)
* AsciiDoc (`.asciidoc`, `.adoc`, `.asc`)

Other formats will be added as well, to make it match with the others that you
[can use][fmts] with GitHub.


## Warnings

There are some limitations when using this package, which include:

* If a relative path was passed to `filename`, it will be resolved from the
  process current directory.
* If the `README` was not found, a simple `404` is sent back.
* If the markup for your `README` isn't implemented, an error will be `throw`n.
* The operations are performed in a **synchronous** way.


## TODO

* Support [other formats][fmts] to emulate GitHub's true `README` rendering.
* Implement **asynchronous** operations whenever possible.
* Test with older [Express](http://expressjs.com) versions.


## License

This project is released under the [MIT License](LICENSE.txt).


[fmts]: https://github.com/github/markup#markups
