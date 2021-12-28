import { minDifference } from "../../../src/data-structure/tree/minDifference";

describe("minDifference", () => {
    it("should pass", () => {
        expect(minDifference([6, 6, 0, 1, 1, 4, 6])).toBe(2);
    });

    it("should pass", () => {
        expect(minDifference([1, 5, 0, 10, 14])).toBe(1);
    });
});
