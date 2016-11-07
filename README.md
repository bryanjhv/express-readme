# Express README

Serve your `README.md` as GitHub would do within your Express 4 app.


## Usage

Call it with your Express app:

```js
// Create an Express app
var app = require('express')();

// Serve README.md on GET '/'
require('express-readme')(app);
```

### Options

You can pass two options:

* **`filename`**: The path to the `README.md` you want to serve. Can be relative
  or absolute.
* **`routes`**: The routes the package should respond to. Can be a string or
  array of routes.

```js
// Create an Express app
var app = require('express')();

// Serve SAMPLE.md on GET '/' and GET '/readme'
require('express-readme')(app, {
  filename: 'SAMPLE.md',
  routes: ['/', '/readme']
});
```


## License

This project is released under the [MIT License](LICENSE.txt).
