import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchUsersData = () => {
  return (dispatch) => {
    dispatch(actManageUsersRequest());
    api.get("/sellerpendings")
      .then(result => {
        const uncheckedProduct = result.data.filter(p => p.status === "Chờ duyệt");
        const checkedProduct = result.data.filter(p => p.status !== "Chờ duyệt");
        dispatch(actManageUsersSuccess(uncheckedProduct.concat(checkedProduct)));
      })
      .catch(error => {
        dispatch(actManageUsersFailed(error));
      });
  }
}
const actManageUsersRequest = () => {
  return {
    type: ActionType.SELLERS_MANAGEMENT_REQUEST,
  }
};
const actManageUsersSuccess = data => {
  return {
    type: ActionType.SELLERS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageUsersFailed = error => {
  return {
    type: ActionType.SELLERS_MANAGEMENT_FAILED,
    payload: error
  }
};

export const actFetchUsersInfo = () => {
  return (dispatch) => {
    dispatch(actManageUsersInfoRequest());
    api.get("/users")
      .then(result => {
        dispatch(actManageUsersInfoSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageUsersInfoFailed(error));
      });
  }
}
const actManageUsersInfoRequest = () => {
  return {
    type: ActionType.USERS_MANAGEMENT_REQUEST,
  }
};
const actManageUsersInfoSuccess = data => {
  return {
    type: ActionType.USERS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageUsersInfoFailed = error => {
  return {
    type: ActionType.USERS_MANAGEMENT_FAILED,
    payload: error
  }
};