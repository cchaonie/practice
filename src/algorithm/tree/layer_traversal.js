function layerTraversal(root) {
  if (!root) return [];
  let result = [], queue = [];
  queue.push(root);
  while (queue.length) {
    let front = queue.shift();
    result.push(front.val);
    if (front.left) queue.push(front.left);
    if (front.right) queue.push(front.right);
  }
  return result;
}

exports.layerTraversal = layerTraversal;