const http = require("http");
const chalk = require("chalk");

const { createConnect } = require("./connect");

const app = createConnect();
const middleware1 = (req, res, next) => {
  console.log(chalk.yellow("before next in middleware1"));
  next();
  console.log(chalk.yellow("after next in middleware1"));
  res.end("res end");
};

const middleware2 = (req, res, next) => {
  console.log(chalk.green("before next in middleware2"));
  next();
  console.log(chalk.green("after next in middleware2"));
};

app.use(middleware1);
app.use(middleware2);
http.createServer(app).listen(8888);
