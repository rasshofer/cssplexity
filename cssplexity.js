var css = require('css');
var tokenizer = require('css-selector-tokenizer');

function generateSelectorTree (selector) {

  if (!selector) {
    return false;
  }

  selector = selector.split(/,/)[0];

  var parsed = tokenizer.parse(selector);

  var filtered = parsed.nodes.filter(function (node) {
    return node.type === 'selector' && node.nodes && node.nodes.length;
  });

  if (filtered.length === 0) {
    return false;
  }

  var conditions = filtered.shift().nodes.filter(function (subnode) {
    if (subnode.type === 'spacing') {
      subnode.type = 'child';
      delete subnode.value;
    }
    return subnode;
  });

  return conditions.reverse();

}

function extractSelectorSubject (selector) {

  var tree = generateSelectorTree(selector);

  if (tree === false) {
    return false;
  }

  return tree[0];

}

function extractSelectorConditions (selector) {

  var tree = generateSelectorTree(selector);

  if (tree === false) {
    return false;
  }

  return tree.slice(1);

}

function calculcateSelectorComplexity (selector) {

  if (!selector) {
    return false;
  }

  var conditions = extractSelectorConditions(selector);

  if (conditions === false) {
    return false;
  }

  return (conditions.length + 1);

}

function parseCss (code) {

  if (!code) {
    return false;
  }

  var obj;
  var results = [];

  try {
    obj = css.parse(code);
  } catch (e) {
    return false;
  }

  if (obj.stylesheet && obj.stylesheet.rules) {
    obj.stylesheet.rules.forEach(function (rule) {
      if (rule.selectors && rule.selectors.length) {
        rule.selectors.forEach(function (selector) {
          results.push({
            selector: selector,
            complexity: calculcateSelectorComplexity(selector)
          });
        });
      }
    });
  }

  if (!results.length) {
    return false;
  }

  return results.sort(function (a, b) {
    return a.complexity - b.complexity;
  }).reverse();

}

module.exports = {
  selector: calculcateSelectorComplexity,
  parse: parseCss,
  tree: generateSelectorTree,
  subject: extractSelectorSubject,
  conditions: extractSelectorConditions
};
