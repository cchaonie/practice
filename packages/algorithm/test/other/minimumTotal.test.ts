import { minimumTotal } from "../../src/other/minimumTotal";

describe("minimumTotal", () => {
    it("should pass", () => {
        expect(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])).toBe(11);
    });

    it("should pass", () => {
        expect(minimumTotal([[2], [3, 4], [7, 5, 6], [4, 2, 0, 3]])).toBe(10);
    });
});
