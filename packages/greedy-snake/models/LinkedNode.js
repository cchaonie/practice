export default class LinkedNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  toString(key) {
    let head = this;
    let str = '';
    while (head) {
      str += head.data[key] + '->';
      head = head.next;
    }
    console.log(str.substring(0, str.length - 2));
  }
}
