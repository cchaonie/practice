const webpack = require("webpack");
const devConfig = require("../config/webpack.dev");

const compiler = webpack(devConfig);
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
    console.log(
        stats.toString({
            colors: true,
        })
    );
});
