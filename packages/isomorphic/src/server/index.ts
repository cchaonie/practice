import express from "express";

import controller from "./controller";

const port = process.env.PORT || 8181;
const app = express();

app.use(controller);

app.listen(port, () => console.log(`[server] listening port: ${port}`));
