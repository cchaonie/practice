import webpack from "webpack";
import clientConfig from "../../config/webpack.client";
import serverConfig from "../../config/webpack.server";

const clientCompiler = webpack(clientConfig as webpack.Configuration);
const serverCompiler = webpack(serverConfig as webpack.Configuration);

serverCompiler.run((err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("build server successfully");
});

clientCompiler.run((err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("build client successfully");
});
