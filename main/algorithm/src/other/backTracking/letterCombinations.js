

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const map = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const result = [];
  function backtrack(digits, selection) {
    if (!digits.length) return;
    const selectionLength = selection.length;
    const selectionStr = selection.join("");
    if (selectionLength === digits.length && !result.includes(selectionStr)) {
      result.push(selectionStr);
      return ;
    }
    let options = map[digits.charAt(selectionLength)];
    for (const op of options) {
      selection.push(op);
      backtrack(digits, selection);
      selection.pop();
    }
  }
  backtrack(digits, []);
  return result;
};

module.exports = {
  letterCombinations
};
