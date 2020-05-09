const {
  BinaryTreeNode,
  binaryTreeLayerGenerator
} = require("./definition");


let testTree1 = new BinaryTreeNode(1)
  .addLeft(new BinaryTreeNode(2))
  .addRight(new BinaryTreeNode(3));
let array1 = [1, 2, 3];

let testTree2 = new BinaryTreeNode(1)
  .addLeft(new BinaryTreeNode(2)
    .addRight(new BinaryTreeNode(3)))
  .addRight(new BinaryTreeNode(2)
    .addRight(new BinaryTreeNode(3))
  );
let array2 = [1, 2, 2, null, 3, null, 3];

describe("binaty tree layer generator", () => {
  test("success1", () => {
    expect(binaryTreeLayerGenerator(array1)).toEqual(testTree1);
  });
  test("success2", () => {
    expect(binaryTreeLayerGenerator(array2)).toEqual(testTree2);
  });
});