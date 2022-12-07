import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchUsersData = () => {
  return (dispatch) => {
    dispatch(actManageUsersRequest());
    api.get("/users")
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
    type: ActionType.USERS_MANAGEMENT_REQUEST,
  }
};
const actManageUsersSuccess = data => {
  return {
    type: ActionType.USERS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageUsersFailed = error => {
  return {
    type: ActionType.USERS_MANAGEMENT_FAILED,
    payload: error
  }
};

export const actDeleteUser = id => {
  return (dispatch) => {
    dispatch(actDeleteUserRequest());
    api.delete(`/users/${id}`)
      .then(result => {
        dispatch(actDeleteUserSuccess());
        alert("Deleted successfully! Refresh & change.")
      })
      .catch(error => {
        dispatch(actDeleteUserFailed(error));
      });
  }
}
const actDeleteUserRequest = () => {
  return {
    type: ActionType.USER_DELETE_REQUEST,
  }
};
const actDeleteUserSuccess = data => {
  return {
    type: ActionType.USER_DELETE_SUCCESS,
    payload: data
  }
};
const actDeleteUserFailed = error => {
  return {
    type: ActionType.USER_DELETE_FAILED,
    payload: error
  }
};