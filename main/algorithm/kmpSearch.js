function next(str) {
  let result = [];
  let i = 0,
    j = -1;
  result[0] = -1;
  while (i < str.length - 1) {
    if (j == -1 || str[i] == str[j]) {
      i++;
      j++;
      result[i] = j;
    } else {
      j = result[j];
    }
  }
  return result;
}

module.exports = {
  next
}