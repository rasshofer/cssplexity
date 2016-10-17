# CSSplexity

> A small helper to calculcate the cyclomatic complexity of CSS selectors

[![Build Status](https://travis-ci.org/rasshofer/cssplexity.svg)](https://travis-ci.org/rasshofer/cssplexity)
[![Coverage Status](https://coveralls.io/repos/github/rasshofer/cssplexity/badge.svg)](https://coveralls.io/github/rasshofer/cssplexity)
[![Dependency Status](https://david-dm.org/rasshofer/cssplexity/status.svg)](https://david-dm.org/rasshofer/cssplexity)
[![Dependency Status](https://david-dm.org/rasshofer/cssplexity/dev-status.svg)](https://david-dm.org/rasshofer/cssplexity)

## Installation

```shell
npm install cssplexity --save-dev
```

## Examples

### Calculcate selector complexity

```js
var cssplexity = require('cssplexity');
var result = cssplexity.selector('.teaser .article-title .headline');
console.log('Complexity: ' + result);
```

### Parse CSS file and calculcate selector complexities

```js
var cssplexity = require('cssplexity');
var results = cssplexity.parse('.teaser .article-title .headline { color: red } body { background: red }');
console.log(JSON.stringify(results, null, 2));
```

## API

### cssplexity.selector(selector)

Accepts a CSS selector and returns its complexity.

In case no valid CSS selector is provided, `false` is returned.

### cssplexity.parse(code)

Accepts CSS code and returns an object containing the complexity per selector, ordered decreasingly by complexity.

In case no valid CSS selector is found within the provided CSS code, `false` is returned.

### cssplexity.tree(selector)

Accepts a CSS selector and returns its tree (subject and conditions).

In case no valid CSS selector is provided, `false` is returned.

### cssplexity.subject(selector)

Accepts a CSS selector and returns its subject.

In case no valid CSS selector is provided, `false` is returned.

### cssplexity.conditions(selector)

Accepts a CSS selector and returns its conditions.

In case no valid CSS selector is provided, `false` is returned.

## Changelog

* 0.3.0
  * Fix parser for selector-less input (e.g. comments)
* 0.2.0
  * Fix complexity calculation to include the subject as well
* 0.1.0
  * Fix complexity calculation to include child selectors as well
* 0.0.2
  * Update outdated dependencies
* 0.0.1
  * Initial version

## License

Copyright (c) 2016 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
