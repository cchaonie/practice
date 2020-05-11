const {
  binaryTreeLayerGenerator
} = require("../../../src/data-structure/tree/definition");
const {
  connect_next_with_queue,
  connect_perfect_binary_tree_next
} = require("../../../src/data-structure/tree/connect_next")

describe("connext_next", () => {
  test("with queue", () => {
    let t = binaryTreeLayerGenerator([1, 2, 3, 4, 5, 6, 7]);
    let connect_t = connect_next_with_queue(t);
    expect(connect_t.left.next).toEqual(connect_t.right);
  });

  test("iterative", () => {
    let t = binaryTreeLayerGenerator([1, 2, 3, 4, 5, 6, 7]);
    let connect_t = connect_perfect_binary_tree_next(t);
    expect(connect_t.left.next).toEqual(connect_t.right);
  });
});