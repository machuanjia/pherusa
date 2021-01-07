/** @format */

import * as actionTypes from './operate.types';
// import store from '@stores/store';

export const dispatchAction = (action) => {
  return (dispatch) => {
    dispatch(action);
  };
};

export const setStep = (step) => {
  const action = {
    type: actionTypes.SET_STEP,
    payload: step,
  };
  return dispatchAction(action);
};

// export const updateDraftAction = (draft) => (dispatch) => {
//   return new Promise((reslove) => {
//     const payload = { ...store.getState().operate.draft, ...draft };
//     if (typeof payload.company_create_time === 'object') {
//       payload.company_create_time = Number(payload.company_create_time.format('X'));
//     }
//     // updateContractDraft(payload).then(
//     //     res => {
//     //         if (res.data) {
//     //             message.success('保存成功!')
//     //             dispatch({
//     //                 type: actionTypes.SET_DRAFT,
//     //                 payload: payload,
//     //             })
//     //             store.getState().operate.isNext &&
//     //                 dispatch({
//     //                     type: actionTypes.SET_STEP,
//     //                     payload: store.getState().operate.step + 1,
//     //                 })
//     //         }
//     //         reslove(true)
//     //     },
//     //     err => {
//     //         message.error('保存失败!')
//     //     },
//     // )
//   });
// };
