const surnames = require("./lib/surname");
const names = require("./lib/name");

exports.create = (surnameLength = 1, fullLength = 2) => {
    if (fullLength <= surnameLength) {
        throw new Error("Full name length must be smaller than surname length");
    }

    if (surnameLength > 5) {
        throw new Error("Max surname length is 5");
    }

    let surname, name;

    const nameCreatorMap = {
        1: names.get1,
        2: names.get2,
        3: names.get3,
    };

    do {
        surname = surnames.getOne();
    } while (surname.length !== surnameLength);

    name = nameCreatorMap[fullLength - surnameLength]();

    return surname + name;
};
