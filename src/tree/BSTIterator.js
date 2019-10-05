function BSTIterator(root) {
  this.data = in_order_traversal(root);
  console.log(this.data);
};

function in_order_traversal(root) {
    let result = [];
    let cur = root,
        next = null;
    while (cur) {
        if (cur.left) {
            next = cur.left;
            while (next.right && next.right != cur) {
                next = next.right;
            }
            if (!next.right) {
                next.right = cur;
                cur = cur.left;
            }
            if (next.right == cur) {
                next.right = null;
                result.push(cur.val);
                cur = cur.right;
            }
        } else {
            result.push(cur.val);
            cur = cur.right;
        }
    }
    return result;
}

BSTIterator.prototype.next = function() {
  return this.data.shift();
};

BSTIterator.prototype.hasNext = function() {
  return this.data.length > 0;
};

module.exports = {
  BSTIterator
}