/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-02-04 15:55:32
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/stores/article/article.actions.ts
 * @Description: 
 */

import * as actionTypes from './article.types';
import type { IArticle, ArticleAction } from '@interfaces/index';

export const dispatchAction = (action: ArticleAction) => {
  return (dispatch) => {
    dispatch(action);
  };
};

export const addArticle = (article: IArticle) => {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  };
  return dispatchAction(action);
};

export const removeArticle = (article: IArticle) => {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  };
  return dispatchAction(action);
};
