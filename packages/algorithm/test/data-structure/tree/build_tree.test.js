const {
  binaryTreeLayerGenerator
} = require("../../../src/data-structure/tree/definition");
const {
  buildTreeFromPreOrderAndInOrder,
  buildTreeFromInOrderAndPostOrder
} = require("../../../src/data-structure/tree/build_tree")

describe("build tree", () => {
  test(" from preorder and inorder", () => {
    expect(buildTreeFromPreOrderAndInOrder([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))
    .toEqual(binaryTreeLayerGenerator([3, 9 ,20, null, null, 15, 7]));
  });
  test(" from inorder and postorder", () => {
    expect(buildTreeFromInOrderAndPostOrder([9, 3, 15, 20, 7], [9, 15, 7, 20,3]))
    .toEqual(binaryTreeLayerGenerator([3, 9 ,20, null, null, 15, 7]));
  });
});