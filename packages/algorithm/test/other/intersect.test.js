const intersect = require("../../src/other/intersect");

describe("intersect", () => {
    it("should pass", () => {
        expect(intersect([1, 2, 2, 1], [2, 2])).toEqual([2, 2]);
    });
    it("should pass", () => {
        expect(intersect([1, 2, 2, 1], [3, 4])).toEqual([]);
    });
    it("should pass", () => {
        expect(intersect([1, 2, 2, 1], [2, 5])).toEqual([2]);
    });
    it("should pass", () => {
        expect(intersect([1, 2, 2, 1], [2, 2, 3, 2])).toEqual([2, 2]);
    });
    it("should pass", () => {
        expect(intersect([1, 2, 2, 1], [])).toEqual([]);
    });
});
