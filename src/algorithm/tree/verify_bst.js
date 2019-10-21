const BinaryTreeNode = require('./definition').BinaryTreeNode;

/**
 * @param {BinaryTreeNode} root
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

let testTree = new BinaryTreeNode(4)
  .addLeft(new BinaryTreeNode(3))
  .addRight(new BinaryTreeNode(5).addRight(new BinaryTreeNode(6)))

console.log(isValidBST(testTree))