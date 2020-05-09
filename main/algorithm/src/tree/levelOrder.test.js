const {
  binaryTreeLayerGenerator
} = require("./definition");
const {
  levelOrder,
  levelOrderBottom
} = require("./levelOrder");

describe("层序遍历", () => {
  test("levelOrder", () => {
    expect(levelOrder(binaryTreeLayerGenerator([7, 5, 10])))
      .toEqual([
        [7],
        [5, 10]
      ])
  });
  test("levelOrderBottom", () => {
    expect(levelOrderBottom(binaryTreeLayerGenerator([3, 9, 20, null, null, 15, 7])))
      .toEqual([
        [15, 7],
        [9, 20],
        [3]
      ])
  });
});