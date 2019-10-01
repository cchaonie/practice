const TreeNode = require('./tree/definition').TreeNode;

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const stack = [];
  let min = -Infinity;
  while (stack.length > 0 || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.val <= min) return false;
    min = root.val;
    root = root.right;
  }
  return true;
};

let testTree = new TreeNode(4)
  .addLeft(new TreeNode(3))
  .addRight(new TreeNode(5).addRight(new TreeNode(6)))

console.log(isValidBST(testTree))