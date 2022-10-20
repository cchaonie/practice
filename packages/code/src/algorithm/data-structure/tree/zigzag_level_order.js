/**
 * @param {BinaryTreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  let result = [],
    level = 0,
    queue = [],
    stack = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    result.push([]);
    for (let i = 0; i < len; i++) {
      let front = null;
      if (level %2 == 1) {
        front = queue.pop();
        stack.push(front);
      } else {
        front = queue.shift();
        if (front.left) queue.push(front.left);
        if (front.right) queue.push(front.right);
      }
      result[level].push(front.val);
    }
    while (stack.length) {
      let front = stack.pop();
      if (front.left) queue.push(front.left);
      if (front.right) queue.push(front.right);
    }
    level++;
  }
  return result;
};

exports.zigzagLevelOrder = zigzagLevelOrder;