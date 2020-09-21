import { frequencySort } from "../../src/other/frequencySort";

describe("frequencySort", () => {
    it.only("should pass", () => {
        expect(['eetr', 'eert'].includes(frequencySort("tree"))).toBe(true);
    });
});
