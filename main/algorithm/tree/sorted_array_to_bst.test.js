const {
  levelOrder
} = require("./levelOrder")
const {
  sortedArrayToBST,
} = require("./sorted_array_to_bst");

describe("将数组转换成二叉搜索树", () => {
  test("levelOrder", () => {
    expect(levelOrder(sortedArrayToBST([-10, -3, 0, 5, 9])))
      .toEqual([ [0], [-3, 9], [-10, 5]])
  });
});