import { maxTurbulenceSize } from "../../../src/other/dynamicProgramming/maxTurbulenceSize";

describe("maxTurbulenceSize", () => {
  it("should pass", () => {
    expect(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])).toBe(5);
    //                          \  \  /   \  /  -  \  /
  });
  it("should pass", () => {
    expect(maxTurbulenceSize([0, 1, 1, 0, 1, 0, 1, 1, 0, 0])).toBe(5);
    //                         /   -  \  /  \  /  - \  -
  });
});
