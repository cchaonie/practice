const assert = require("assert")
/********************第 1 题**********************/
// 用正则解析 url 的参数

// 入参格式参考：
const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
// 出参格式参考：
const params = {
  a: "1",
  b: "2",
  c: "3",
  d: null
};

function queryParse() {
  let path = arguments[0];
  if (!path.length) return {};
  let start = path.indexOf('?');
  if (start == -1) return {};
  let end = path.indexOf('#');
  let paramStr = path.substring(start + 1, end > start ? end : path.length);
  let paramArr = paramStr.split('&');
  let params = {};
  for (let entry of paramArr) {
    let p = entry.split('=');
    params[p[0]] = p[1] !== undefined ? p[1] : null;
  }
  return params;
}
console.log(queryParse(""));
console.log(queryParse("https://www.taobao.com"));
console.log(queryParse("https://www.taobao.com?a=1&b=2&c=3&d#name"));
// /*******单测部分*******/
// try {
//   assert.deepEqual(queryParse(""), {});
//   assert.deepEqual(queryParse("https://www.taobao.com"), {});
//   assert.deepEqual(queryParse("https://www.taobao.com?a=1&b=2&c=3&d#name"), {
//     a: "1",
//     b: "2",
//     c: "3",
//     d: null
//   });
//   testResults[0] = "通过";
// } catch {
//   testResults[0] = "不通过";
// }

/********************第 2 题**********************/
// 判断一个链路是否对称闭环
// input: 1->2
// ouput: false

// input 1->2->3->2->1
// ouput: true

function isSymmetricalClosed(path) {
  let pathArr = path.split(/->/);
  const isSummetrical = function (arr, left, right) {
    if (left === right) {
      return true;
    } else if (arr[left] === arr[right]) {
      return isSummetrical(arr, left + 1, right - 1);
    } else {
      return false;
    }
  }
  return isSummetrical(pathArr, 0, pathArr.length - 1);
}


/*******单测部分*******/
// try {
//   assert(isSymmetricalClosed("1->2") === false);
//   assert(isSymmetricalClosed("1") === true);
//   assert(isSymmetricalClosed("1->2->3->2->1") === true);
//   assert(isSymmetricalClosed("1->2->3->1") === false);
//   testResults[1] = "通过";
// } catch {
//   testResults[1] = "不通过";
// }

/********************第 3 题**********************/
// 顺序打印一个列表，两次打印间需要有时间间隔
// 入参格式参考：list = [1, 2, 3, 4]  delay = 5
// 控制台输出情况：
// > 1
// （过了 5 秒）
// > 2
// （过了 5 秒）
// > 3
// （过了 5 秒）
// > 4

function printList(list, delay) {
  list.forEach(function (v) {
    setTimeout(function () { console.log(v) }, delay * (v - 1) * 1000);
  });
}
// printList([1, 2, 3, 4], 5);

/********************第 4 题**********************/
// 从一个树状数据结构中，找出值最大的一个节点
// 入参格式参考：
const sourceTree = {
  id: "i1",
  value: 17,
  left: {
    id: "i3",
    value: 83,
    left: {
      id: "i4",
      value: 101
    },
    right: {
      id: "i9",
      value: 22
    }
  },
  right: {
    id: "i11",
    value: 26
  }
};
// 出参格式参考：
const maxNode = {
  id: "i4",
  value: 101
};

function findMaxNode(tree) {
  if (!tree) return null;
  let current = tree,
    next = null,
    maxNode = {};
  while (current) {
    if (current.left) {
      next = current.left;
      while (next.right && next.right !== current) {
        next = next.right;
      }
      if (!next.right) {
        if (!maxNode.id || maxNode.value < current.value) {
          maxNode.id = current.id;
          maxNode.value = current.value;
        }
        next.right = current;
        current = current.left;
      } else {
        next.right = null;
        current = current.right;
      }
    } else {
      if (!maxNode.id || maxNode.value < current.value) {
         maxNode.id = current.id;
         maxNode.value = current.value;
      }
      current = current.right;
    }
  }
  return maxNode;
}

console.log(findMaxNode({ id: "i1", value: 10 }))
console.log(findMaxNode({ id: "i1", value: 10, left: { id: "i2", value: 12 } }))

/*******单测部分*******/
// try {
//   assert.deepEqual(
//     findMaxNode({
//       id: "i1",
//       value: 17,
//       left: {
//         id: "i3",
//         value: 83,
//         left: {
//           id: "i4",
//           value: 101
//         },
//         right: {
//           id: "i9",
//           value: 22
//         }
//       },
//       right: {
//         id: "i11",
//         value: 26
//       }
//     }),
//     {
//       id: "i4",
//       value: 101
//     }
//   );
//   assert.deepEqual(findMaxNode({ id: "i1", value: 10 }), {
//     id: "i1",
//     value: 10
//   });
// assert.deepEqual(findMaxNode({ id: "i1", value: 10, left: { id: "i2" } }), {
//   id: "i1",
//   value: 10
// });
//   testResults[3] = "通过";
// } catch {
//   testResults[3] = "不通过";
// }

/********************第 5 题**********************/
// 实现一个日程安排函数，可以不断地登记行程安排，但不允许时间上出现三重重叠
// *三重重叠的含义为：有某个日期，同时被三次登记覆盖到
// *不考虑不同月份，并且假定每个月都是 31 天

// const mySchedule = new Calendar();
// mySchedule.book(1, 10) true
// mySchedule.book(8, 14) true (8-10 双重重叠)
// mySchedule.book(22, 30) true
// mySchedule.book(2, 9) false (8-9 三重重叠)
// mySchedule.book(18，20) true

class Calendar {
  constructor() {
    this.schedule = {};
  }

  book(start, end) {
    if (start <= 0 || start > 31) return false;
    if (end <= 0 || end > 31) return false;
    if (start > end) return false;
    let d = start;
    while (d <= end) {
      if (this.add(d)) {
        ++d;
      } else {
        return false;
      }
    }
    return true;
  }

  add(d) {
    let iSche = this.schedule[d];
    if (!iSche) {
      this.schedule[d] = 1;
      return true;
    } else if (iSche === 2) {
      return false;
    } else {
      this.schedule[d] = iSche + 1;
      return true;
    }
  }
}

// const mySchedule = new Calendar();
// console.log(mySchedule.book(0, 0))// === false);
// console.log(mySchedule.book(32, 35))// === false);
// console.log(mySchedule.book(1, 10))// === true);
// console.log(mySchedule.book(8, 14))// === true);
// console.log(mySchedule.book(12, 16))// === true);
// console.log(mySchedule.book(22, 30))// === true);
// console.log(mySchedule.book(2, 9))// === false);
// console.log(mySchedule.book(18, 20))// === true);
// console.log(mySchedule.book(13, 17))// === false);

/*******单测部分*******/
// try {
//   const mySchedule = new Calendar();
//   assert(mySchedule.book(0, 0) === false);
//   assert(mySchedule.book(32, 35) === false);
//   assert(mySchedule.book(1, 10) === true);
//   assert(mySchedule.book(8, 14) === true);
//   assert(mySchedule.book(12, 16) === true);
//   assert(mySchedule.book(22, 30) === true);
//   assert(mySchedule.book(2, 9) === false);
//   assert(mySchedule.book(18, 20) === true);
//   assert(mySchedule.book(13, 17) === false);
//   testResults[4] = "通过";
// } catch {
//   testResults[4] = "不通过";
// }
