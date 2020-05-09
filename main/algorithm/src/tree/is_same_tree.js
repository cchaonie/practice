var isSameTree = function(p, q) {
  if (isSameNode(p, q)) {
    if (p && q) {
      return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
    return true;
  }
  return false;
};
function isSameNode (n1, n2) {
  if (!n1 && !n2) return true;
  if (n1 && n2 && n1.val == n2.val) return true;
  return false;
}

exports.isSameTree = isSameTree;