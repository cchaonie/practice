const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const filePath = path.resolve(process.argv[2]);
console.log(filePath);
let dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function (data) {
    // console.log(Object.keys(data));
    // Object.keys(data).forEach(key => {
    //     console.log(typeof data[key]);
    //     if (typeof data[key] == "object") {
    //         const value = data[key];
    //         Object.keys(value).forEach(key => console.log(typeof value[key]))
    //     }
    // })
    // // number of pages
    // console.log(data.numpages);
    // // number of rendered pages
    // console.log(data.numrender);
    // // PDF info
    // console.log(data.info);
    // // PDF metadata
    // console.log(data.metadata);
    // // PDF.js version
    // // check https://mozilla.github.io/pdf.js/getting_started/
    // console.log(data.version);
    // // PDF text
    // console.log(data.text);
});