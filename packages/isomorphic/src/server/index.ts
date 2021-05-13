import controller from "./controller";
import express from "express";

const port = process.env.PORT || 8181;
const app = express();

app.use(controller);
app.listen(port, () => console.log(`listening port: ${port}`));
