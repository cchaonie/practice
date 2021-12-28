const sortedSquares = require("../../src/other/sortedSquares");

describe("sortedSquares", () => {
    it("should pass", () => {
        expect(sortedSquares([-1])).toEqual([1]);
    });

    it("should pass", () => {
        expect(sortedSquares([-1, 0])).toEqual([0, 1]);
    });

    it.only("should pass", () => {
        expect(sortedSquares([-4, -1, 0, 3, 10])).toEqual([0, 1, 9, 16, 100]);
    });
});
