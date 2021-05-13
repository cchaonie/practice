import webpack from "webpack";
import clientConfig from "../../config/webpack.client";
import serverConfig from "../../config/webpack.server";

const clientCompiler = webpack(clientConfig as webpack.Configuration);
const serverCompiler = webpack(serverConfig as webpack.Configuration);

serverCompiler.watch(
    {
        ignored: /node_modules/,
    },
    (err, stats) => {
        console.log(stats);
    }
);
clientCompiler.watch(
    {
        // Example [watchOptions](/configuration/watch/#watchoptions)
        aggregateTimeout: 300,
        poll: undefined,
    },
    (err, stats) => {
        // [Stats Object](#stats-object)
        // Print watch/build result here...
        console.log(stats);
    }
);
