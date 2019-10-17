function findNumber(arr, k) {
  arr.sort((a, b) => a - b);
  let i = 0, j = arr.length - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (arr[mid] == k) {
      return "YES";
    } else if (arr[mid] < k) {
      i = mid + 1;
    } else {
      j = mid - 1;
    }
  }
  return "NO";
}

module.exports = {
  findNumber
}