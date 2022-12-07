import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

export const actPayToCart = (user_id, method) =>{
  
  return (dispatch) => {
    dispatch(actPayToCartRequest());
    api.post("/payments", {user_id, method})
      .then(result => {
        dispatch(actPayToCartSuccess(result.data));
      })
      .catch(error => {
        dispatch(actPayToCartFailed(error));
      });
  }
}
const actPayToCartRequest = () => {
  return {
    type: ActionTypes.PAY_MANAGEMENT_REQUEST,
  }
};
const actPayToCartSuccess = data => {
  return {
    type: ActionTypes.PAY_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actPayToCartFailed = error => {
  return {
    type: ActionTypes.PAY_MANAGEMENT_FAILED,
    payload: error
  }
};

export const actFetchBalanceData = (user_id) => {
  return (dispatch) => {
    dispatch(actManageBalanceRequest());
    api.get(`/digitalpays/${user_id}`)
      .then(result => {
        dispatch(actManageBalanceSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageBalanceFailed(error));
      });
  }
}
const actManageBalanceRequest = () => {
  return {
    type: ActionTypes.BALANCE_MANAGEMENT_REQUEST,
  }
};
const actManageBalanceSuccess = data => {
  return {
    type: ActionTypes.BALANCE_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageBalanceFailed = error => {
  return {
    type: ActionTypes.BALANCE_MANAGEMENT_FAILED,
    payload: error
  }
};