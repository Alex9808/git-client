import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers';

import { api } from './middleware';

const configureStore = (history, apiHelper) => {
    const middlewares = applyMiddleware(
            routerMiddleware(history),
            /*crashReporter,*/
            thunk,
            api(apiHelper)
        );
    let initialState = {};
    const store = createStore(
        combineReducers({
            router: connectRouter(history),
            ...reducers,
        }),
        initialState,
        middlewares,
    );

    return store;
};

export default configureStore;
