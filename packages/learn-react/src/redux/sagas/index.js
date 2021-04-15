import { fork } from "redux-saga/effects";
import { helloSaga } from "./helloSaga";

export const rootSaga = function* () {
    yield fork(helloSaga);
};
