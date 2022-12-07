import api from 'utils/apiUtils';
import * as ActionTypes from './constants';

export const actManageUsers = (info, method, id) => {
  return dispatch => {
    dispatch(actModalRequest());
    if (method == "Thêm") {
      api.post("/users/", info)
        .then(result => {
          dispatch(actModalAddSuccess(result.data));
        })
        .catch(error => {
          dispatch(actModalAddFailed(error))
        });
    } else if (method == "Chỉnh sửa") {
      api.put(`/users/${id}`, info)
        .then(result => {
          dispatch(actModalEditSuccess(result.data));
        })
        .catch(error => {
          dispatch(actModalEditFailed(error))
        });
    }
  };
}


const actModalRequest = () => ({
  type: ActionTypes.MODAL_REQUEST
});

const actModalAddSuccess = () => ({
  type: ActionTypes.MODAL_ADD_SUCCESS,
});

const actModalAddFailed = error => ({
  type: ActionTypes.MODAL_ADD_FAILED,
  payload: error
});

const actModalEditSuccess = () => ({
  type: ActionTypes.MODAL_EDIT_SUCCESS,
});

const actModalEditFailed = error => ({
  type: ActionTypes.MODAL_EDIT_FAILED,
  payload: error
});

export const actResetModal = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.MODAL_RESET
    });
  };
};