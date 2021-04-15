import { sortString } from "../../src/other/sortString";

describe("sortString", () => {
    it("case 1", () => {
        expect(sortString("aaaabbbbcccc")).toBe("abccbaabccba");
    });

    it("case 2", () => {
        expect(sortString("rat")).toBe("art");
    });

    it("case 3", () => {
        expect(sortString("leetcode")).toBe("cdelotee");
    });
});
