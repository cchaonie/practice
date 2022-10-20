/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersection(nums1, nums2) {
  let result = [];
  const comparator = (a, b) => a - b;
  nums1.sort(comparator);
  nums2.sort(comparator);
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] == nums2[j]) {
      if (!result.includes(nums1[i])) {
        result.push(nums1[i]);
      } else {
        ++i;
        ++j;
      }
    } else if (nums1[i] < nums2[j]) {
      ++i;
    } else {
      ++j;
    }
  }
  return result;
}


function sortedLinkedListIntersection(l1, l2) {
  let p1 = l1;
  let p2 = l2;
  let head = null;
  let nextNode = null;
  while (p1 != null && p2 != null) {
    if (p1.val === p2.val) {
      if (!head) {
        head = p1;
        nextNode = head;
      } else {
        nextNode.next = p1;
        nextNode = nextNode.next;
      }
      p1 = p1.next;
      p2 = p2.next;
    } else {
      if (p1.val > p2.val) {
        p2 = p2.next;
      } else {
        p1 = p1.next;
      }
    }
  }
  return head;
}
function LinkedList(v) {
  this.next = null;
  this.val = v;
}
l1 = new LinkedList(1);
l2 = new LinkedList(2);
l3 = new LinkedList(3);
l4 = new LinkedList(4);
l5 = new LinkedList(5);
l6 = new LinkedList(7);
l1.next = l2;
l2.next = l3;
l3.next = l4;
l4.next = l5;
l5.next = l6;
r1 = new LinkedList(2)
r2 = new LinkedList(3);
r3 = new LinkedList(4);
r4 = new LinkedList(5);
r1.next = r2;
r2.next = r3;
r3.next = r4;

intersection = sortedLinkedListIntersection(l1, r1);

module.exports = {
  intersection
}