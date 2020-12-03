/** @format */

import * as actionTypes from './files-action-types'
import { IFile, FileAction, DispatchType } from '@entities/file'

export const initFiles = (payload: IFile[]) => {
  const action: FileAction = {
    type: actionTypes.INIT_FILES,
    payload,
  }
  return dispatchAction(action)
}

export const clearFiles = () => {
  const action: FileAction = {
    type: actionTypes.CLEAR_FILES,
  }
  return dispatchAction(action)
}

export const addFile = (payload: IFile) => {
  const action: FileAction = {
    type: actionTypes.ADD_FIle,
    payload,
  }
  return dispatchAction(action)
}

export const removeArticle = (payload: IFile) => {
  const action: FileAction = {
    type: actionTypes.REMOVE_FILE,
    payload,
  }
  return dispatchAction(action)
}

export const dispatchAction = (action: FileAction) => {
  return (dispatch: DispatchType) => {
    dispatch(action)
  }
}
