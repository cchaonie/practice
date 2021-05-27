import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";

import App from "../components/App";

const disableSSR = process.env.DISABLE_SSR;

const root = document.getElementById("root");

if (disableSSR === "1") {
    ReactDOM.render(<App />, root);
} else {
    loadableReady(() => {
        ReactDOM.hydrate(<App />, root);
    });
}
