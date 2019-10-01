const { TreeNode } = require("./definition")
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
  let length = nums.length;
  if (length === 0) return null;
  let rootValIndex = length % 2 == 1 ? Math.floor(length / 2) : length / 2;
  let root = new TreeNode(nums[rootValIndex]);
  root.left = sortedArrayToBST(nums.slice(0, rootValIndex));
  root.right = sortedArrayToBST(nums.slice(rootValIndex + 1));
  return root;
};

module.exports = {
  sortedArrayToBST
}