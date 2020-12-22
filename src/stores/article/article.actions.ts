/** @format */

import * as actionTypes from './article.types'
import { IArticle, ArticleAction, DispatchType } from '@entities/article'

export const addArticle = (article: IArticle) => {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  }
  return dispatchAction(action)
}

export const removeArticle = (article: IArticle) => {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  }
  return dispatchAction(action)
}

export const dispatchAction = (action: ArticleAction) => {
  return (dispatch: DispatchType) => {
    dispatch(action)
  }
}
