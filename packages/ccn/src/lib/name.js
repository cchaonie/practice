const random = require("random-to");
let nameDict = require("../dict/words");

const dict = nameDict.split("\n").map(d => d.split(" "));

const propertiesInterval = (n1, n2) => {
    if (n1 > n2) {
        n1 += n2;
        n2 = n1 - n2;
        n1 -= n2;
    }

    return Math.min(n2 - n1, n1 + 5 - n2);
};

let properties = ["金", "水", "木", "火", "土"];

const names = dict.reduce(
    (acc, n) => {
        if (n.length === 1 && n[0] === "") return acc;
        try {
            acc[n[2].split("：")[0]].push([n[1], n[2]]);
        } catch (error) {
            console.log(n);
        }

        return acc;
    },
    {
        金: [],
        木: [],
        水: [],
        火: [],
        土: [],
    }
);

let combination2 = [];
let combination2Max = 0;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        let temp = { property: properties[i] + properties[j] };
        temp.min = combination2Max;

        let interval = propertiesInterval(i, j);
        if (0 === interval) combination2Max += 100;
        if (1 === interval) combination2Max += 50;
        if (2 === interval) combination2Max += 20;

        temp.max = combination2Max - 1;

        combination2.push(temp);
    }
}

let combination3 = [];
let combination3Max = 0;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        let base = propertiesInterval(i, j);
        if (base === 0) base = 100;
        if (base === 1) base = 50;
        if (base === 2) base = 20;
        for (let k = 0; k < 5; k++) {
            let temp = {
                property: properties[i] + properties[j] + properties[j],
            };
            temp.min = combination3Max;

            let interval = propertiesInterval(j, k);
            if (0 === interval) combination3Max += 100;
            if (1 === interval) combination3Max += 50;
            if (2 === interval) combination3Max += 20;
            combination3Max += base;

            temp.max = combination3Max - 1;

            combination3.push(temp);
        }
    }
}

const getOneWord = property => {
    if (!property) property = properties[random.from0upto(5)];

    let temp = names[property];
    let idx = random.from0upto(temp.length);
    return temp[idx];
};

const getTwoWords = property => {
    if (!property) {
        let idx = random.from0upto(combination2Max);
        property = combination2.find(p => {
            return p.min <= idx && p.max >= idx;
        }).property;
    }

    return [getOneWord(property[0]), getOneWord(property[1])];
};

const getThreeWords = property => {
    if (!property) {
        let idx = random.from0upto(combination3Max);
        property = combination3.find(p => {
            return p.min <= idx && p.max >= idx;
        }).property;
    }
    const twoWords = getTwoWords(property.substr(0, 2));
    const oneWord = getOneWord(property[2]);
    return [...twoWords, oneWord];
};

exports.get1 = property => {
    const [name, description] = getOneWord(property);
    return `${name}\n1. ${description}`;
};

exports.get2 = property => {
    const [first, second] = getTwoWords(property);
    return `${first[0]}${second[0]}\n1. ${first[1]}\n2. ${second[1]}`;
};

exports.get3 = property => {
    const [first, second, third] = getThreeWords(property);

    return `${first[0]}${second[0]}${third[0]}\n1. ${first[1]}\n2. ${second[1]}\n3. ${third[1]}`;
};

exports.get = () => {
    let temp = random.from1to(1000);
    if (temp <= 475) return exports.get1();
    if (temp <= 950) return exports.get2();
    return exports.get3();
};

exports.dict = names;
