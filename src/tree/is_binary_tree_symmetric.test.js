const { binaryTreeLayerGenerator } = require("./definition");
const { isBinaryTreeSymmetric } = require("./is_binary_tree_symmetric");

let testTree1 = binaryTreeLayerGenerator([1,2,2,null,3,3,null]);

let testTree2 = binaryTreeLayerGenerator([1,2,2,null,3,null,3]);

let testTree3 = binaryTreeLayerGenerator([]);

describe("is binary tree symmtric", () => {
  test("symmtric", () => {
    expect(isBinaryTreeSymmetric(testTree1)).toEqual(true)
  });
  test("symmtric with null", () => {
    expect(isBinaryTreeSymmetric(testTree2)).toEqual(false)
  });
  test("symmtric with null", () => {
    expect(isBinaryTreeSymmetric(testTree3)).toEqual(false)
  });
});