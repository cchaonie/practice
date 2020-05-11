const {
  binaryTreeLayerGenerator,
  BinaryTreeNode
} = require("../../../src/data-structure/tree/definition");
const {
  lowestCommonAncestor
} = require("../../../src/data-structure/tree/lowest_common_ancestor");

describe("lowestCommonAncestor", () => {
  test("[3,5,1,6,2,0,8,null,null,7,4], 5, 1", () => {
    let t = binaryTreeLayerGenerator([3,5,1,6,2,0,8,null,null,7,4]);
    let p = new BinaryTreeNode(5);
    let q = new BinaryTreeNode(1);
    expect(lowestCommonAncestor(t, p, q).val).toEqual(3);
  });
  test("[3,5,1,6,2,0,8,null,null,7,4], 5, 4", () => {
    let t = binaryTreeLayerGenerator([3,5,1,6,2,0,8,null,null,7,4]);
    let p = new BinaryTreeNode(5);
    let q = new BinaryTreeNode(4);
    expect(lowestCommonAncestor(t, p, q).val).toEqual(5);
  });
});