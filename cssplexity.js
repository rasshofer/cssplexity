var css = require('css');
var cssSelectorTree = require('css-selector-tree');

function calculcateSelectorComplexity (selector) {

  if (!selector) {
    return false;
  }

  var conditions = cssSelectorTree.conditions(selector);

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
  parse: parseCss
};
