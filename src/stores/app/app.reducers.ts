import * as actionTypes from './app.types';
import type { AppState, AppAction } from '@entities/app';
import routes from '@routes/index';

const initialState: AppState = {
  token: '',
  permissions: [],
  roles: [],
  routers: routes,
  flattenRouters: [],
  warning: '',
  id: '',
  activeNav: null,
};

const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      };
    case actionTypes.SET_ROLES:
      return {
        ...state,
        roles: action.roles,
      };
    case actionTypes.SET_ROUTERS:
      return {
        ...state,
        routers: action.routers,
      };
    case actionTypes.SET_FLATTEN_ROUTERS:
      return {
        ...state,
        flattenRouters: action.flattenRouters,
      };
    case actionTypes.SET_WARNING:
      return {
        ...state,
        warning: action.warning,
      };
    case actionTypes.SET_USET_ID:
      return {
        ...state,
        id: action.id,
      };
    case actionTypes.SET_ACTIVE_NAV:
      return {
        ...state,
        activeNav: action.activeNav,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
