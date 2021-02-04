/*
 * @Author: D.Y
 * @Date: 2020-12-17 10:23:10
 * @LastEditTime: 2021-02-04 15:55:47
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/stores/store.ts
 * @Description:
 */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import articleReducer from './article/article.reducers'
import appReducer from './app/app.reducers'

const rootReducer = combineReducers({
  article: articleReducer,
  app: appReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
