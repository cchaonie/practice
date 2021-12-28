import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { reducer } from "./reducers";
import { logger as MyLogger } from "./middlewares";
import { rootEpic } from "./epics";
import { rootSaga } from "./sagas";

const initialState = {
    count: 1,
};

export default () => {
    const epicMiddleware = createEpicMiddleware();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(MyLogger, logger, epicMiddleware, sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
    epicMiddleware.run(rootEpic);

    return store;
};
