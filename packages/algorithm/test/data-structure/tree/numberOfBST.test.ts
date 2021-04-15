import { numberOfBST } from "../../../src/data-structure/tree/numberOfBST";

describe("numberOfBST", () => {
    it("should pass", () => {
        expect(numberOfBST(1)).toBe(1);
    });

    it("should pass", () => {
        expect(numberOfBST(3)).toBe(5);
    });
});
