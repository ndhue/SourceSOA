import api from 'utils/apiUtils';
import * as ActionTypes from './constants';

export const actManageSeller = (id,method,status) => {
  console.log(status, id);
  return dispatch => {
    dispatch(actModalSellerRequest());
    if (method == "Duyệt"){
      api.put(`/sellerpendings/${id}`,{status})
        .then(result => {
          dispatch(actModalSellerEditSuccess(result.data));
        })
        .catch(error => {
          dispatch(actModalSellerEditFailed(error))
        });
    }
  };
}

const actModalSellerRequest = () => ({
  type: ActionTypes.MODAL_SELLER_REQUEST
});


const actModalSellerEditSuccess = () => ({
  type: ActionTypes.MODAL_SELLER_EDIT_SUCCESS,
});

const actModalSellerEditFailed = error => ({
  type: ActionTypes.MODAL_SELLER_EDIT_FAILED,
  payload: error
});

export const actResetModal = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.MODAL_SELLER_RESET
    });
  };
};

export const actFetchUsersDataByID = (userEdit) => {
  return (dispatch) => {
    dispatch(actManageUsersRequest());
    api.get(`/users/${userEdit.user_id}`)
      .then(result => {
        dispatch(actManageUsersSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageUsersFailed(error));
      });
  }
}

const actManageUsersRequest = () => {
  return {
    type: ActionTypes.USERS_MANAGEMENT_REQUEST,
  }
};
const actManageUsersSuccess = data => {
  return {
    type: ActionTypes.USERS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageUsersFailed = error => {
  return {
    type: ActionTypes.USERS_MANAGEMENT_FAILED,
    payload: error
  }
};