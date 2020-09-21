const esprima = require('esprima');
const fs = require("fs");
const gulp = require("gulp");
const ts = require("gulp-typescript");

gulp.task("default", function () {
    var tsResult = gulp.src("D://workspace/online-order-node/web/actions/*")
        .pipe(ts({
              noImplicitAny: true,
              out: "output.js"
        }));
        debugger;
        console.log(JSON.stringify(esprima.parseModule(tsResult)));
    return tsResult.js.pipe(gulp.dest("built/local"));
});

// fs.readFile('D://workspace/online-order-node/web/actions/seat.ts', { encoding: 'utf-8' }, (error, data) => {
//     if (error) console.log(error);
//     console.log(JSON.stringify(esprima.parseModule(data)));
// });
