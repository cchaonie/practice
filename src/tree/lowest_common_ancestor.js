function lowestCommonAncestor(root, p, q) {
  let result = null;
  function traversal(root, p, q) {
    if (!root) return false;
    let mid = root.val === p.val || root.val === q.val ? 1 : 0;
    let left = traversal(root.left, p, q) ? 1 : 0;
    let right = traversal(root.right, p, q) ? 1 : 0;
    if (mid + left + right > 1) result = root;
    return mid + left + right > 0;
  } 
  traversal(root, p, q);
  return result;
}



module.exports = {
  lowestCommonAncestor
}
