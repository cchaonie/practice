const { convertBST } = require("../../../src/data-structure/tree/convertBST");
const { binaryTreeLayerGenerator }  = require("../../../src/data-structure/tree/definition");

describe("convertBST", () => {
  test("[3,9]", () => {
    let t = binaryTreeLayerGenerator([3,9]);
    expect(convertBST(t)).toEqual(2);
  })
})