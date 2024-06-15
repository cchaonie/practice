export default class LinkedNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  toString(key) {
    let head = this;
    while (head) {
      console.log(head.data[key], '->');
      head = head.next;
    }
  }
}
