var hasPathSum = function (root, sum) {
  let pathSumArray = pathSum(root);
  return pathSumArray.includes(sum);
};

function pathSum(root) {
  if (!root) return [];
  let result = [],
    pathSumQueue = [],
    queue = [];
  queue.push(root);
  pathSumQueue.push(root.val);
  while (queue.length > 0) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      if (node.left || node.right) {
        let parentPathSum = pathSumQueue.shift();
        if (node.left) {
          pathSumQueue.push(parentPathSum + node.left.val);
          queue.push(node.left);
        }
        if (node.right) {
          pathSumQueue.push(parentPathSum + node.right.val);
          queue.push(node.right);
        }
      } else {
        let parentPathSum = pathSumQueue.shift();
        result.push(parentPathSum);
      }
    }
  }
  return result;
}

module.exports = {
  hasPathSum
}