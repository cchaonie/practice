function customIndexOf(str1, str2) {
  let nextIndex = next(str2);
  let i = 0,
    j = 0;
  while (i < str1.length && j < str2.length) {
    if (j == -1 || str1[i] == str2[j]) {
      ++i;
      ++j;
    } else {
      j = nextIndex[j];
    }
  }
  if (j == str2.length) {
    return i - j;
  } else {
    return -1;
  }
}

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
  next,
  customIndexOf
}