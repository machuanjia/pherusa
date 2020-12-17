/** @format */

import * as actionTypes from './files.types'
import { FileAction, DispatchType } from '@entities/file'

export const setPath = path => {
  const action = {
    type: actionTypes.SET_PATH,
    payload: path,
  }
  return dispatchAction(action)
}

export const setPrefix = prefix => {
  const action = {
    type: actionTypes.SET_PREFIX,
    payload: prefix,
  }
  return dispatchAction(action)
}

export const dispatchAction = (action: FileAction) => {
  return (dispatch: DispatchType) => {
    dispatch(action)
  }
}
