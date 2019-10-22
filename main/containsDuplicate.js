/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let root = null;
  while (nums.length > 0) {
      let val = nums.shift();
      let result = insertIfNotContain(root, val);
      if (result) {
          root = result;
      } else {
          return true;
      }
  }
  return false;
};

function BSTNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function insertIfNotContain(root, val) {
  if (!root) return new BSTNode(val);
  if (root.val < val) {
      let result = insertIfNotContain(root.right, val);
      if (result) {
          root.right = result;
      } else {
        return false;
      }
  } else if (root.val > val) {
      let result = insertIfNotContain(root.left, val);
      if (result) {
          root.left = result;
      } else {
        return false;
      }
  } else {
      return false;
  }
  return root;
}

module.exports = {
  containsDuplicate
}