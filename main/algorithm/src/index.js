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



module.exports = {
  permute,
};
