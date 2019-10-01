function is_balanced(root) {
  if (!root) return true;
  let left_height = height(root.left);
  let right_height = height(root.right);
  return is_balanced(root.left) && 
  is_balanced(root.right) &&
  Math.abs(left_height - right_height) < 2;
}

function height(root) {
  if (!root) return -1;
  let left_height = height(root.left);
  let right_height = height(root.right);
  return 1 + Math.max(left_height, right_height);
}

module.exports = { is_balanced };