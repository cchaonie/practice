"use strict";

const shell = require("shelljs");

const fs = require("fs");

module.exports = argv => {
  if (argv.name) {
    shell.mkdir(argv.name);
  }

  if (argv.dirNames) {
    fs.readFile(argv.dirNames, {
      encoding: "utf-8"
    }, (err, data) => {
      if (err) {
        throw err;
      }

      console.log(data);
      const fileNames = data.split(",");
      shell.mkdir(fileNames);
    });
  }
};