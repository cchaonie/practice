const shell = require("shelljs");
const fs = require("fs");
module.exports = argv => {
    if (argv.name) {
        shell.touch(argv.name);
    }

    if (argv.fileNames) {
        fs.readFile(argv.fileNames, (err, data) => {
            if (err) {
                throw err;
            }
            const fileNames = data.split(",");
            shell.touch(fileNames);
        });
    }
};
