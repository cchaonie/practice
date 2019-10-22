const {
  binaryTreeLayerGenerator
} = require("./definition");
const {
  maxDepth
} = require("./max_depth");

let t1 = binaryTreeLayerGenerator([])
let t2 = binaryTreeLayerGenerator([1, 2, 3, null, null, 5])

describe("max depth", () => {
  test("[]", () => {
    expect(maxDepth(t1)).toEqual(0)
  });
  test("[1, 2, 3, null, null, 5]", () => {
    expect(maxDepth(t2)).toEqual(3)
  });
});