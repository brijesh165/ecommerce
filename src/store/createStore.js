import {createStore, applyMiddleware} from 'redux';
import createSagaMiddle from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './Reducers/rootReducer';
import rootSaga from './Sagas/rootSaga';

const sagaMiddleware = createSagaMiddle();
export const middlewares = [
    logger,
    thunk,
    sagaMiddleware
];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;