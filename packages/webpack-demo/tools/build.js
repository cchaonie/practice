const webpack = require("webpack");
const devConfig = require("../config/webpack.config");
// const fs = require("fs");

const compiler = webpack(devConfig);
compiler.run((err, stats) => {
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
    // fs.writeFileSync("./stats.json", JSON.stringify(info))
    console.log(
        stats.toString({
            colors: true,
        })
    );
});
