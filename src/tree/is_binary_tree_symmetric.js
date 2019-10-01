/**
 *  * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 * 
 * ⁠     1
 * ⁠   /   \
 * ⁠  2     2
 *  ⁠  \     \
 *     4     4
 * 
 * 中序 [3, 2, 4, 1, 4, 2, 3]
 * 前序 [1, 2, 3, 4, 2, 4, 3]
 * @param {*} root 
 */
function isBinaryTreeSymmetric(root) {
  if (!root) return false;
  let result = [],
    level = 0,
    queue = [];
  queue.push(root);
  while (queue.length) {
    let len = queue.length;
    result.push([]);
    for (let i = 0; i < len; i++) {
      let front = queue.shift();
      if (front) {
        result[level].push(front.val);
        if (front.left) {
          queue.push(front.left);
        } else {
          queue.push(null);
        }
        if (front.right) {
          queue.push(front.right);
        } else {
          queue.push(null);
        }
      } else {
        result[level].push(null);
      }
    }
    if (!isArraySymmetric(result[level])) return false;
    level++;
  }
  return true;
};

function isArraySymmetric(array) {
  let len = array.length;
  if (len == 1) return true;
  if (len % 2 == 1) return false;
  let center = len / 2;
  for (let i = center, j = center - 1; i < len, j >= 0; i++, j--) {
    if (array[i] == array[j]) continue;
    else return false;
  }
  return true;
}

exports.isBinaryTreeSymmetric = isBinaryTreeSymmetric;