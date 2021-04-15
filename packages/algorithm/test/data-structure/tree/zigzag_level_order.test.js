const {
  binaryTreeLayerGenerator
} = require("../../../src/data-structure/tree/definition");
const {
  zigzagLevelOrder
} = require("../../../src/data-structure/tree/zigzag_level_order");

let t1 = binaryTreeLayerGenerator([]);

let t2 = binaryTreeLayerGenerator([1, 2, 3]);

let t3 = binaryTreeLayerGenerator([1, 2, null, 3]);

let t4 = binaryTreeLayerGenerator([1, 2, null, null, 3]);

let t5 = binaryTreeLayerGenerator([1, 2, 3, 4, null, null, 5]);

let t6 = binaryTreeLayerGenerator([3, 9, 20, null, null, 15, 7])

describe("zigzag traversal", () => {
  test("[]", () => {
    expect(zigzagLevelOrder(t1)).toEqual([])
  });
  test("[1, 2, 3]", () => {
    expect(zigzagLevelOrder(t2)).toEqual([
      [1],
      [3, 2]
    ])
  });
  test("[1, 2, null, 3]", () => {
    expect(zigzagLevelOrder(t3)).toEqual([
      [1],
      [2],
      [3]
    ])
  });
  test("[1, 2, null, null, 3]", () => {
    expect(zigzagLevelOrder(t4)).toEqual([
      [1],
      [2],
      [3]
    ])
  });
  test("[1,2,3,4,null,null,5]", () => {
    expect(zigzagLevelOrder(t5)).toEqual([
      [1],
      [3, 2],
      [4, 5]
    ])
  });
  test("[3,9,20,null,null,15,7]", () => {
    expect(zigzagLevelOrder(t6)).toEqual([
      [3],
      [20, 9],
      [15, 7]
    ])
  });
});