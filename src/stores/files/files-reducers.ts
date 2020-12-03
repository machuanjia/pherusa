/** @format */

import * as actionTypes from './files-action-types'
import { IFile, FileState, FileAction } from '@entities/file'

const initialState: FileState = {
  files: [
    {
      id: 1,
      name: 'post 1',
      date: 'Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi',
    },
    {
      id: 2,
      name: 'post 2',
      date: 'Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint',
    },
  ],
}

const reducer = (state: FileState = initialState, action: FileAction): FileState => {
  switch (action.type) {
    case actionTypes.CLEAR_FILES:
      return {
        ...state,
        files: [],
      }
    case actionTypes.INIT_FILES:
      return {
        ...state,
        files: [...action.payload],
      }
    case actionTypes.ADD_FIle:
      const newFile: IFile = {
        id: Math.random(),
        name: action.payload['name'],
        date: new Date().toString(),
      }
      return {
        ...state,
        files: state.files.concat(newFile),
      }
    case actionTypes.REMOVE_FILE:
      const updatedFiles: IFile[] = state.files.filter(article => article.id !== action.payload['id'])
      return {
        ...state,
        files: updatedFiles,
      }
  }
  return state
}

export default reducer
