function levelOrder(root) {
  if (!root) return [];
  let result = [], level = 0, queue = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    result.push([]);
    for (let i = 0; i < len; i++) {
      let front = queue.shift();
      result[level].push(front.val);
      if (front.left) queue.push(front.left);
      if (front.right) queue.push(front.right);
    }
    level++;
  }
  return result;
}

/**
 * @param {BinaryTreeNode} root
 * @return {number[][]}
 */
function levelOrderBottom(root) {
  if (!root) return [];
  let result = [], level = 0, stack = [];
  stack.push([root]);
  while (level < stack.length) {
    let currentLevel = level;
    ++level;
    for (let node of stack[currentLevel]) {
      if (node.left || node.right) {
        if (!stack[level]) stack[level] = [];
        if (node.left) stack[level].push(node.left);
        if (node.right) stack[level].push(node.right);
      }
    }
  }
  let length = stack.length;
  for (let i = 0; i < length; i++) {
    result[i] = [];
    let levelNodes = stack.pop();
    for(let node of levelNodes) {
      result[i].push(node.val)
    }
  }
  return result;
};

module.exports = {
  levelOrder,
  levelOrderBottom
}