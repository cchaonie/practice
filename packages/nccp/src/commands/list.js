const shell = require("shelljs");
module.exports = argv => {
    const path = argv.path;
    shell.ls(path).forEach(filename => console.log(filename));
};
