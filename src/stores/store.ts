/*
 * @Author: D.Y
 * @Date: 2020-12-17 10:23:10
 * @LastEditTime: 2021-04-22 18:56:04
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/stores/store.ts
 * @Description:
 */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './app/app.reducers'

const rootReducer = combineReducers({
  app: appReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
