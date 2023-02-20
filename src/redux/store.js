import {
    legacy_createStore,
    applyMiddleware,
    compose,
    combineReducers

} from 'redux'

import thunk from 'redux-thunk'
import { authReducer } from './auth/reducer';
import { orderReducer } from './order/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:authReducer,
    order:orderReducer,
})

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
