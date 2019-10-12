/**
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {
  if (!root) return 0;
  let left_height = minDepth(root.left);
  let right_height = minDepth(root.right);
  if (left_height > 0 && right_height) {
    return 1 + Math.min(left_height, right_height);
  } else {
    return 1 + Math.max(left_height, right_height);
  }
  
};

module.exports = {
  minDepth
}