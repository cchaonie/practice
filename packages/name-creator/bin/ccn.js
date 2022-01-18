#!/usr/bin/env node

const { create } = require("../src/index");

const [result, surname, fullName] = Array.prototype.slice.call(process.argv, 2);

const resultCount = parseInt(result, 10);
const surnameCount = surname ? parseInt(surname, 10) : 1;
const fullNameCount = fullName ? parseInt(fullName, 10) : surnameCount + 1;

for (let i = 0; i < resultCount; i += 1) {
    console.log(create(surnameCount, fullNameCount));
}
