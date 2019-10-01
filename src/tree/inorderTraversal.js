/**
 * 递归
 * @param {TreeNode} root
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

let testTree = new TreeNode(3)
  .addLeft(new TreeNode(5).addRight(new TreeNode(7).addLeft(new TreeNode(9))))
  .addRight(new TreeNode(1).addRight(new TreeNode(6)))

let result = inorderTraversal_recursive(testTree);
console.log(result);
result = inorderTraversal_iterative(testTree);
console.log(result);