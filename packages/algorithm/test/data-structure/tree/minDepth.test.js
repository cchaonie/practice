const { minDepth } = require("../../../src/data-structure/tree/minDepth");
const { binaryTreeLayerGenerator }  = require("../../../src/data-structure/tree/definition");

describe("minDepth", () => {
  test("[3,9]", () => {
    let t = binaryTreeLayerGenerator([3,9])
    expect(minDepth(t)).toEqual(2);
  })
})