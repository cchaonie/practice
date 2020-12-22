const webpack = require("webpack");
const devConfig = require("../webpack.config");
const fs = require("fs");

const compiler = webpack(devConfig);
console.log(compiler)
compiler.run((err, stats) => {
    console.log("build is done");
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    if (stats.hasErrors()) {
        console.error(info.errors);
        return;
    }
    fs.writeFileSync("./stats.json", JSON.stringify(info))
    console.log(
        stats.toString({
            colors: true,
        })
    );
});
