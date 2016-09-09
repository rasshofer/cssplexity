var fs = require('fs');
var path = require('path');
var tap = require('tap');
var cssplexity = require('../cssplexity');

// API

tap.equal(typeof cssplexity, 'object');
tap.equal(typeof cssplexity.selector, 'function');
tap.equal(typeof cssplexity.parse, 'function');
tap.equal(typeof cssplexity.tree, 'function');
tap.equal(typeof cssplexity.subject, 'function');
tap.equal(typeof cssplexity.conditions, 'function');

// Selector API

tap.equal(cssplexity.selector(null), false);
tap.equal(cssplexity.selector(), false);
tap.equal(cssplexity.selector(''), false);
tap.equal(cssplexity.selector('body'), 0);
tap.equal(cssplexity.selector('.grid-homepage .teaser .article-title .headline'), 3);
tap.equal(cssplexity.selector(new Array(3).join(' ')), false);

// Parser API

tap.equal(cssplexity.parse(null), false);
tap.equal(cssplexity.parse(), false);
tap.equal(cssplexity.parse(''), false);
tap.equal(cssplexity.parse('invalid code'), false);
tap.equal(cssplexity.parse(new Array(3).join(' ')), false);

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

// Tree API

tap.equal(cssplexity.tree(null), false);
tap.equal(cssplexity.tree(), false);
tap.equal(cssplexity.tree(''), false);
tap.equal(cssplexity.tree(new Array(3).join(' ')), false);
tap.deepEqual(cssplexity.tree('.grid-homepage .teaser .article-title .headline'), [{
  type: 'class',
  'name': 'headline'
}, {
  type: 'class',
  'name': 'article-title'
}, {
  type: 'class',
  'name': 'teaser'
}, {
  type: 'class',
  'name': 'grid-homepage'
}]);

// Subject API

tap.equal(cssplexity.subject(null), false);
tap.equal(cssplexity.subject(), false);
tap.equal(cssplexity.subject(''), false);
tap.equal(cssplexity.subject(new Array(3).join(' ')), false);
tap.deepEqual(cssplexity.subject('.grid-homepage .teaser .article-title .headline'), {
  type: 'class',
  'name': 'headline'
});

// Conditions API

tap.equal(cssplexity.conditions(null), false);
tap.equal(cssplexity.conditions(), false);
tap.equal(cssplexity.conditions(''), false);
tap.equal(cssplexity.conditions(new Array(3).join(' ')), false);
tap.deepEqual(cssplexity.conditions('.grid-homepage .teaser .article-title .headline'), [{
  type: 'class',
  'name': 'article-title'
}, {
  type: 'class',
  'name': 'teaser'
}, {
  type: 'class',
  'name': 'grid-homepage'
}]);
