/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (n <= 0) return [];
  const result = [];
  let selection = "";
  for (let i = selection.length / 2; i < n; i++) {
    for (let index of findLeft(selection)) {
      selection = `${selection.substring(0, index + 1)}()${selection.substring(index + 1)}`;
      if (selection.length === n * 2 && !result.includes(selection)) {
        result.push(selection);
      }
    }
  }
  function findLeft(selection) {
    let indexArray = [-1];
    for (let i = 0; i < selection.length; i++) {
      if (selection.charAt(i) === "(") {
        indexArray.push(i);
      }
    }
    return indexArray;
  }
  return result;
};

module.exports = generateParenthesis;
