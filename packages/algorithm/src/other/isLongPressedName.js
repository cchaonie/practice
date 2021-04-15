var isLongPressedName = function (name, typed) {
    let i = 0;
    let j = 0;
    while (i < name.length && j < typed.length) {
        if (name.charAt(i) === typed.charAt(j)) {
            i++;
            j++;
        } else if (j > 0 && typed.charAt(j) === typed.charAt(j - 1)) {
            j++;
        } else {
            return false;
        }
    }
    if (i === name.length && j === typed.length) {
        return true;
    } else if (i === name.length && j < typed.length) {
        for (; j < typed.length; j++) {
            if (j > 0 && typed.charAt(j) !== typed.charAt(j - 1)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};

module.exports = {
    isLongPressedName,
};
