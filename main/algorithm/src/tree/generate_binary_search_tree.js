/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees-ii/description/
 *
 * algorithms
 * Medium (59.17%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    11K
 * Total Submissions: 18.5K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。
 * 
 * 示例:
 * 
 * 输入: 3
 * 输出:
 * [
 * [1,null,3,2],
 * [3,2,null,1],
 * [3,1,null,null,2],
 * [2,1,3],
 * [1,null,2,null,3]
 * ]
 * 解释:
 * 以上的输出对应以下 5 种不同结构的二叉搜索树：
 * 
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 * 
 * 
 */
/**
 * Definition for a binary tree node.
 */
function BinaryTreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number} n
 * @return {BinaryTreeNode[]}
 */
var generateTrees = function (n) {
  function generate(start, end) {
    let result = [];
    if (start > end) {
      result.push(null);
    }
    for (let i = start; i <= end; i++) {
      let left = generate(start, i - 1);
      let right = generate(i + 1, end);
      for (let l of left) {
        for (let r of right) {
          let root = new BinaryTreeNode(i);
          root.left = l;
          root.right = r;
          result.push(root);
        }
      }
    }
    return result;
  }

  if (n == 0) {
    return [];
  }
  return generate(1, n);
};


let result = generateTrees(3);
console.log(result);