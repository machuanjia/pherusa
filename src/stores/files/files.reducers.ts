/** @format */

import * as actionTypes from './files.types'
import { FileState, FileAction } from '@entities/file'

const initialState: FileState = {
  path: '',
  prefix: '',
}

const reducer = (state: FileState = initialState, action: FileAction): FileState => {
  switch (action.type) {
    case actionTypes.SET_PATH:
      return {
        ...state,
        path: action.payload,
      }
    case actionTypes.SET_PREFIX:
      return {
        ...state,
        prefix: action.payload,
      }
  }
  return state
}

export default reducer
