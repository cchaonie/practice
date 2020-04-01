import controller from "./controller";
import express from "express";
import path from "path";


const port = process.env.PORT || 8181;
const app = express();

app.use(express.static("../dist"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"))
app.use(controller);
app.listen(port, () => console.log(`listening port: ${port}`));
