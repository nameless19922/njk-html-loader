[![npm version](https://badge.fury.io/js/njk-html-loader.svg)](https://www.npmjs.com/package/njk-html-loader)

- [ ] Passing an array to the root
- [ ] Add example
- [ ] Refactoring

# Njk HTML loader for webpack

## Installation

`npm install njk-html-loader`

## Usage

In your sources:

``` javascript
const html = require('./file.njk')
// => returns file.njk content as html compiled string
```

In your webpack.config.js  file:

## Using it with html-loader

`njk-html-loader` encode to content to a string variable to avoid it and pass the string content to the loader chain please use the following configuration:

```javascript
module.exports = {
  // your config settings ...
  module: {
    rules: [{
      test: /\.njk$/,
      use: [
        {
          loader: "html-loader"
        },
        {
          loader: 'njk-html-lodaer',
          options: {
            root: 'path/to/njk files',
            data: {
              object: data,
            },
          }
        },
      ],
    }],
  },
};
```
