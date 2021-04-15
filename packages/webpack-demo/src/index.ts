import { lowerFirst } from "lodash";

let inputEl = document.createElement("input");
document.body.appendChild(inputEl);

let divEl = document.createElement("div");
document.body.appendChild(divEl);

let render = () => {
  import("./utils").then((module) => {
    divEl.innerText = lowerFirst(module.default);
  });
};
render();

if (module.hot) {
  module.hot.accept("./utils",render);
}
