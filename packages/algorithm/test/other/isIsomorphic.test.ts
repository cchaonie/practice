import { isIsomorphic } from "../../src/other/isIsomorphic";

describe("isIsomorphic", () => {
    it.only("should pass", () => {
        expect(isIsomorphic("ab", "aa")).toBe(false);
    });
    it("should pass", () => {
        expect(isIsomorphic("abba", "abab")).toBe(false);
    });
});
