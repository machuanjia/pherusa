/** @format */

import * as actionTypes from './app-types'
import { AppState, AppAction } from '@entities/app'

const initialState: AppState = {
  token: '',
  permissions: [],
  roles: [],
}

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case actionTypes.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      }
    case actionTypes.SET_ROLES:
      return {
        ...state,
        roles: action.roles,
      }
  }
  return state
}

export default reducer
