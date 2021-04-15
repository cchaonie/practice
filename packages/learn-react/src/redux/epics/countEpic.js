import { ofType } from "redux-observable";
import { delay, mapTo } from "rxjs/operators";

export const increaseEpic = action$ =>
    action$.pipe(
        ofType("INCREASE"),
        delay(1000),
        mapTo({ type: "INCREASE_SUCCESS" })
    );

export const decreaseEpic = action$ =>
    action$.pipe(
        ofType("DECREASE"),
        delay(1000),
        mapTo({ type: "DECREASE_SUCCESS" })
    );