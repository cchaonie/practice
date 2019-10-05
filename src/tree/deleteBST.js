/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return null;
  if (root.val === key) {
    if (!root.left && !root.right) {
      return null;
    } else if (root.left && !root.right) {
      return root.left;
    } else if (!root.left && root.right) {
      return root.right;
    } else {
      let rightMin = findMin(root.right);
      root.val = rightMin.val;
      root.right = deleteNode(root.right, root.val);
      return root;
    }
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key);
    return root;
  } else {
    root.right = deleteNode(root.right, key);
    return root;
  }
};

function findMin(root) {
  if (!root) return null;
  if (root.left) return findMin(root.left);
  else return root;
}

module.exports = {
  deleteNode
}