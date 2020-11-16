/** @format */

import * as actionTypes from './action-types'
import { IArticle, ArticleAction, DispatchType } from '@entities/article'

export function addArticle(article: IArticle) {
    const action: ArticleAction = {
        type: actionTypes.ADD_ARTICLE,
        article,
    }

    return simulateHttpRequest(action)
}

export function removeArticle(article: IArticle) {
    const action: ArticleAction = {
        type: actionTypes.REMOVE_ARTICLE,
        article,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: ArticleAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}
