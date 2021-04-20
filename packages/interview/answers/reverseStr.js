function reverseStr(str) {
    let i = 0,
        j = str.length - 1;
    while (j > i) {
        let tmp = str[i];
        str[i] = str[j];
        str[j] = tmp;
        i++;
        j--;
    }
    return str;
}
