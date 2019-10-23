const { binaryTreeLayerGenerator } = require("./definition");
const { hasPathSum } = require("./has_path_sum");

describe("hasPathSum", () => {
  test("yes 1", () => {
    let t = binaryTreeLayerGenerator([5,4,8,11,null,13,4,7,2,null,null,null,1]);
    let targetSum = 26;
    expect(hasPathSum(t, targetSum)).toEqual(true)
  });
  test("yes 2", () => {
    let t = binaryTreeLayerGenerator([-3,-4,0,null,null,0,1,null,7,null,-3]);
    let targetSum = 4;
    expect(hasPathSum(t, targetSum)).toEqual(true)
  });
});