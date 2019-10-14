function pathSum(root, target) {
  if (!root) return [];
  let result = [],
    path = [];
  helper(root, target, path, result);
  return result;
}

function helper(root, target, path, result) {
  if (!root) return;
  path.push(root.val);
  if (root.left) {
    helper(root.left, target, path.slice(), result);
  }
  if (root.right) {
    helper(root.right, target, path.slice(), result);
  }
  if (!root.left && !root.right) {
    let sum = path.reduce((s, c) => s += c, 0);
    if (sum === target) {
      result.push(path);
    }
  }
}

module.exports = {
  pathSum,
}