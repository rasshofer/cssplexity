var fs = require('fs');
var path = require('path');
var tap = require('tap');
var cssplexity = require('../cssplexity');

// API

tap.equal(typeof cssplexity, 'object');
tap.equal(typeof cssplexity.selector, 'function');
tap.equal(typeof cssplexity.parse, 'function');

// Selector API

tap.equal(cssplexity.selector(null), false);
tap.equal(cssplexity.selector(), false);
tap.equal(cssplexity.selector(''), false);
tap.equal(cssplexity.selector('body'), 1);
tap.equal(cssplexity.selector('.grid-homepage .teaser .article-title .headline'), 7);
tap.equal(cssplexity.selector(new Array(3).join(' ')), false);

// Parser API

tap.equal(cssplexity.parse(null), false);
tap.equal(cssplexity.parse(), false);
tap.equal(cssplexity.parse(''), false);
tap.equal(cssplexity.parse('invalid code'), false);
tap.equal(cssplexity.parse(new Array(3).join(' ')), false);
tap.equal(cssplexity.parse('/* comment */'), false);

[
  'test1',
  'test2',
  'test3',
  'test4'
].forEach(function (test) {
  var css = fs.readFileSync(path.resolve(__dirname, test + '.css'), 'utf8');
  var result = cssplexity.parse(css);
  var expected = require(path.resolve(__dirname, test + '.json'), 'utf8');
  tap.deepEqual(result, expected);
});
