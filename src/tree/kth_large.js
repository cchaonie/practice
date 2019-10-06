function BSTreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}


function bstGenerator(array) {
  let root = null;
  while (array.length) {
    root = insertIntoBST(root, array.shift());
  }
  return root;
}

function insertIntoBST(root, val) {
  if (!root) return new BSTreeNode(val);
  let cur = root;
  if (cur.val >= val) {
    if (cur.left) {
      insertIntoBST(cur.left, val);
    } else {
      cur.left = new BSTreeNode(val);
    }
  }
  if (cur.val < val) {
    if (cur.right) {
      insertIntoBST(cur.right, val);
    } else {
      cur.right = new BSTreeNode(val);
    }
  }
  return root;
}

function getKthLarge(root, k) {
  let result = inOrderTraversal(root);
  return result[result.length - k];
}

function inOrderTraversal(root) {
  if (!root) return [];
  let result = [],
    cur = root,
    next = null;
  while(cur) {
    if (cur.left) {
      next = cur.left;
      while(next.right && next.right !== cur) {
        next = next.right;
      }
      if (!next.right) {
        next.right = cur;
        cur = cur.left;
      }
      if (next.right === cur) {
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

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.data = bstGenerator(nums);
  this.targetKey = k;
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.data = insertIntoBST(this.data, val);
  return getKthLarge(this.data, this.targetKey);
};

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

module.exports = {
  KthLargest
}