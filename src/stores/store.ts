/** @format */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import articleReducer from './article/reducers'
import fileReducer from './files/files.reducers'
import appReducer from './app/app-reducers'
import operateReducer from './operate/operate.reducers'

const rootReducer = combineReducers({
    article: articleReducer,
    file: fileReducer,
    app: appReducer,
    operate: operateReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
