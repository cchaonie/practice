const TreeNode = require('./definition').TreeNode;

var recoverTree = function (root) {
  const stack = [];
  let first = null;
  let second = null;
  let pre = null;
  let min = -Infinity;
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (!first && min != -Infinity && root.val < pre.val) {
      first = pre;
    }
    if (first && root.val < pre.val) {
      second = root;
    }
    pre = root;
    min = root.val;
    root = root.right;
  }
  if (first && second) {
    const [ a, b ] = [ first.val, second.val ]
    first.val = b;
    second.val = a;
  }
};

let testTree = new TreeNode(3)
  .addLeft(new TreeNode(4))
  // .addRight(new TreeNode(4).addLeft(new TreeNode(2)))

recoverTree(testTree);
console.log(testTree);