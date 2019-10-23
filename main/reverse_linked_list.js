class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  print() {
    let pointer = this;
    let result = '';
    while(pointer) {
      result += pointer.value + '>';
      pointer = pointer.next;
    }
    console.log(result.substring(0, result.length - 1));
  }
}

function reverseLinkedListByk(linkedList, k) {
  if (!linkedList) {
    return null;
  }
  if (k < 1) {
    return linkedList;
  }
  const stack = [];
  let resultHead = null;
  let resultPointer = null;
  let traversePointer = linkedList;
  while(traversePointer) {
    const copy = traversePointer;
    traversePointer = traversePointer.next;
    copy.next = null;
    stack.push(copy);
    if (stack.length == k) {
      while(stack.length) {
        const node = stack.pop();
        if (!resultHead) {
          resultHead = resultPointer = node;
        } else {
          resultPointer.next = node;
          resultPointer = resultPointer.next;
        }
      }
    }
  }
  if (stack.length && stack.length < k) {
    while(stack.length) {
      const node = stack.shift()
      resultPointer.next = node;
      resultPointer = resultPointer.next;
    }
  }
  return resultHead;
}

const linkedList = new Node(5);
n1 = new Node(8);
n2 = new Node(3);
n3 = new Node(6);
n4 = new Node(9);
n5 = new Node(1);
n6 = new Node(10);
n7 = new Node(39);
linkedList.next = n1
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
n5.next = n6;
n6.next = n7;
linkedList.print();
console.log('----------');
let reversed = reverseLinkedListByk(linkedList, 3);
reversed.print();

console.log('main start')
setTimeout(() => console.log('setTimeout'), 0)
Promise.resolve(3).then(value => console.log(value)).then(() => console.log('promise 2'))
new Promise((resolve, reject) => setTimeout(() => resolve(2), 0)).then(value => console.log(value)).then(() => console.log('promise 4'))
console.log('main end')