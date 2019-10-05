const { binaryTreeLayerGenerator } = require("./definition");
const { deleteNode } = require("./deleteBST");

describe("deleteBST", () => {
  test("deleteBST", () => {
    let t = binaryTreeLayerGenerator([5,3,6,2,4,null,7]);
    t = deleteNode(t, 5);
    expect(t.right.val).toEqual(7)
  });
});