/**
 * 递归
 * @param {BinaryTreeNode} root
 * @return {number[]}
 */
var inorderTraversal_recursive = function (root) {
  let result = [];
  if (root.left) {
    result = result.concat(inorderTraversal_recursive(root.left));
  }
  result.push(root.val);
  if (root.right) {
    result = result.concat(inorderTraversal_recursive(root.right));
  }
  return result;
};

var inorderTraversal_iterative = function (root) {
  let result = [];
  let stack = [];
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    result.push(root.val);
    root = root.right;
  }
  return result;
};

let testTree = new BinaryTreeNode(3)
  .addLeft(new BinaryTreeNode(5).addRight(new BinaryTreeNode(7).addLeft(new BinaryTreeNode(9))))
  .addRight(new BinaryTreeNode(1).addRight(new BinaryTreeNode(6)))

let result = inorderTraversal_recursive(testTree);
console.log(result);
result = inorderTraversal_iterative(testTree);
console.log(result);