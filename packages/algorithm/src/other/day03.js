/**
 * 快速排序，递归实现
 * @param {*} array
 */
function quickSort(array) {
  let length = array.length;
  if (length == 0) return;
  partition(array, 0, length - 1);
}

function partition(array, low, high) {
  if (low >= high) return;
  let pivot = array[low];
  let i = low + 1;
  let j = high;
  while (i < j) {
    while (pivot > array[i]) {
      i++;
    }
    while (pivot < array[j]) {
      j--;
    }
    if (i < j && array[i] >= pivot && array[j] <= pivot) {
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      i++;
      j--;
    }
  }
  array[low] = array[j];
  array[j] = pivot;
  partition(array, low, j - 1);
  partition(array, j + 1, high);
}

/**
 * 思路概述：使用回溯法，遍历所有的情况。
 * 用数组 p1和p2 记录两个玩家每次选择的数量，当两个数组中的和为 n 时选择结束。最后的结果结构是 [[p1, p2]]
 * 最终p1能获胜的条件是：
 * 1. p1 和 p2 长度一致
 * 2. p2最后一次为1
 * @param {*} n 
 */
function pickStone(n) {
  const result = [];
  let p1 = [];
  let p2 = [];
  let currentPlayer = 0;
  const changePlayer = () => currentPlayer ? 0 : 1;
  const isSelectionOK = (n, p1, p2) => {
    let sum = 0;
    p1.forEach(c => sum += c);
    p2.forEach(c => sum += c);
    // 全部拿完且p2最后拿的是1
    if (sum === n) {
      return true;
    }
    return false;
  }
  const backtrack = (left, p1, p2) => {
    if (isSelectionOK(n, p1, p2)) {
        if (p1.length === p2.length && p2[p2.length - 1] === 1) {
            result.push([[...p1], [...p2]]);
        }
        return;
    }
    const options = left > 1 ? Math.floor(left / 2) : 1;
    for (let i = 1; i <= options; i++) {
        left -= i;
        currentPlayer ? p2.push(i) : p1.push(i);
        currentPlayer = changePlayer();
        backtrack(left, p1, p2);
        left += i;
        currentPlayer = changePlayer();
        currentPlayer ? p2.pop() : p1.pop();
    }
  }
  backtrack(n, p1, p2);
  return result;
}

module.exports = {
  quickSort,
  pickStone
};
