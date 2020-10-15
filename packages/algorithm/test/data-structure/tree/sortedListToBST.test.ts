import {
    sortedListToBST,
    ListNode,
} from "../../../src/data-structure/tree/sortedListToBST";

describe("sortedListToBST", () => {
    it("should pass", () => {
        const data = [-3, 0, 5, 9];
        let head = new ListNode(-10);
        let curr = head;
        for (const n of data) {
            curr.next = new ListNode(n);
            curr = curr.next;
        }
        expect(sortedListToBST(head)).toBe(1);
    });
});
