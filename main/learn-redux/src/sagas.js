import { takeEvery, take, call, fork, put } from 'redux-saga/effects';
import { ActionType, add } from './actions';

export function* rootSaga() {
    console.log('start rootSaga');
    yield call(doAddAsync);
    console.log('hello takeEvery');
    yield takeEvery(ActionType.REMOVE, doRemove);
    console.log('rootSaga ends');
}

function* doAddAsync() {
    while(true) {
        console.log('doing Add async');
        const { payload } = yield take(ActionType.ADD_ASYNC);
        const result = yield call(() => new Promise((resolve, reject) => setTimeout(() => resolve(2 * payload), 2000)));
        yield put(add(result));
    }
}

function* doRemove() {
    console.log('doing Remove async');
}