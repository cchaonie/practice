const {
  binaryTreeLayerGenerator,
  TreeNode
} = require("./definition");
const {
  lowestCommonAncestor
} = require("./lowest_common_ancestor");

describe("lowestCommonAncestor", () => {
  test("[3,5,1,6,2,0,8,null,null,7,4], 5, 1", () => {
    let t = binaryTreeLayerGenerator([3,5,1,6,2,0,8,null,null,7,4]);
    let p = new TreeNode(5);
    let q = new TreeNode(1);
    expect(lowestCommonAncestor(t, p, q).val).toEqual(3);
  });
  test("[3,5,1,6,2,0,8,null,null,7,4], 5, 4", () => {
    let t = binaryTreeLayerGenerator([3,5,1,6,2,0,8,null,null,7,4]);
    let p = new TreeNode(5);
    let q = new TreeNode(4);
    expect(lowestCommonAncestor(t, p, q).val).toEqual(5);
  });
});