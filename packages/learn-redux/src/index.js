import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import React from "react";
import ReactDOM from "react-dom";
import { logger } from "redux-logger";
import { reducer, initialState } from "./reducer";
import { rootSaga } from "./sagas";
import App from "./App";
import { myMiddleware } from "./middlewares";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger, myMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
