import {all, call} from 'redux-saga/effects';

import userSaga from './user.sagas';
import productsSagas from './products.sagas';

export default function* rootSaga() {
    yield all([
        call(userSaga), 
        call(productsSagas)
    ])
}
