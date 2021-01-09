import { take } from "redux-saga/effects";

export function* helloSaga() {
    while (true) {
        yield take("HELLO SAGA");
        console.log("Hello Sagas!");
    }
}
