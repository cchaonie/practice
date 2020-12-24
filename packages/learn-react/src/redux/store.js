import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { reducer } from "./reducers";
import { logger as MyLogger } from "./middlewares";
import { rootEpic } from "./epics";

const initialState = {
    count: 1,
};

export default () => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(MyLogger, logger, epicMiddleware)
    );

    epicMiddleware.run(rootEpic);

    return store;
};
