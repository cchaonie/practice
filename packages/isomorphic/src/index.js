const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const url = require("url");
const querystring = require("querystring");
const express = require("express");

const port = process.env.PORT || 9000;
const app = express();
app.use(express.static(path.resolve(__dirname, "./assets")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use((req, res) => {
  const urlObject = url.parse(req.url);
  const queryParams = querystring.parse(urlObject.query);
  const data = {
    appHtml: ReactDOMServer.renderToString(
      React.createElement(
        "div",
        null,
        React.createElement("h1", null, "hello isomorphic"),
        React.createElement("img", { src: "/sds.jpg" }),
      )
    ),
    dehydrateData: queryParams
  };
  return res.render("index", data);
});

app.listen(port, () => console.log(`server at ${port}`));
