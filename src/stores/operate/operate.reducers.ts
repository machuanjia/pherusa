/** @format */

import * as actionTypes from './operate.types';
import type { OperateState, OperateAction } from '@entities/operate';

const initialState: OperateState = {
  isEdit: false,
  step: 0,
  draft: null,
  isNext: true,
};

const reducer = (state: OperateState = initialState, action: OperateAction) => {
  switch (action.type) {
    case actionTypes.SET_RENEW_STATE:
      return {
        ...state,
        isEdit: action.payload,
      };
    case actionTypes.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case actionTypes.SET_DRAFT:
      return {
        ...state,
        draft: action.payload,
      };
    case actionTypes.SET_SAVE_PATTEN:
      return {
        ...state,
        isNext: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
