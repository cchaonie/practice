const flatten = require('flatten');
const random = require('random-to');
const surnameDict = require('../dict/surnameDict');

const dict = surnameDict.split('\n\n');

const weights = [100, 70, 10, 5, 1, 1];

let w = 0;
let idx = 0;

const surnames = dict.reduce((acc, names) => {
  names = names.split('\n');
  names = names
    .map(n => {
      return n.split(' ');
    })
    .flat();

  if (names.length === 1 && names[0] === '') return acc;
  for (var i = 0; i < names.length; i++) {
    acc.push({
      name: names[i],
      min: w,
      max: w + weights[idx] - 1,
    });

    w += weights[idx];
  }

  idx++;
  return acc;
}, []);

const count = surnames[surnames.length - 1].max;

exports.getOne = () => {
  const idx = random.from0upto(count);
  return surnames.find(name => {
    return name.min <= idx && name.max >= idx;
  }).name;
};
