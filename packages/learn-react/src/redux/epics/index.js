import { combineEpics } from "redux-observable";
import { increaseEpic, decreaseEpic } from "./countEpic";

export const rootEpic = combineEpics(increaseEpic, decreaseEpic);
