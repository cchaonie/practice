/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];
  const backtrack = (options, choice) => {
    if (choice.length === nums.length) {
      result.push(choice.slice());
    }
    for (let i = 0; i < options.length; i++) {
      if (!choice.includes(options[i])) {
        choice.push(options[i]);
        const restOptions = options.slice();
        restOptions.splice(i, 1);
        backtrack(restOptions, choice);
        choice.pop();
      }
    }
  };
  backtrack(nums, []);
  return result;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = [];
  function backtrack(options, selection) {
    if (isSelectionOK(nums, selection, result)) {
      result.push(selection.slice());
      return;
    }
    for (let i = 0; i < options.length; i++) {
      const choice = options[i];
      selection.push(choice);
      const newOptions = options.slice();
      newOptions.splice(i, 1);
      backtrack(newOptions, selection);
      selection.pop();
    }
  }
  function isSelectionOK(nums, selection, result) {
    if (selection.length !== nums.length) return false;
    if (
      result.length > 0 &&
      result.some((r) => JSON.stringify(r) === JSON.stringify(selection))
    )
      return false;
    return true;
  }
  backtrack(nums, []);
  return result;
};

module.exports = {
  permute,
  permuteUnique,
};
