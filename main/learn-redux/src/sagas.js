import { takeEvery } from 'redux-saga/effects';

export function* rootSaga() {
    console.log('hello saga');
    yield takeEvery('*', fetchData);
}

function* fetchData() {
    console.log('i am fetching data now');
}