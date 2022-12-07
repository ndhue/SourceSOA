import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchOrdersData = () => {
  return (dispatch) => {
    dispatch(actManageOrdersRequest());
    api.get("/orders")
      .then(result => {
        dispatch(actManageOrdersSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageOrdersFailed(error));
      });
  }
}
const actManageOrdersRequest = () => {
  return {
    type: ActionType.ORDERS_MANAGEMENT_REQUEST,
  }
};
const actManageOrdersSuccess = data => {
  return {
    type: ActionType.ORDERS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageOrdersFailed = error => {
  return {
    type: ActionType.ORDERS_MANAGEMENT_FAILED,
    payload: error
  }
};

export const actFetchOrdersDataById = (id) => {
  return (dispatch) => {
    dispatch(actManageOrdersByIdRequest());
    api.get(`/orders/userorder/${id}`)
      .then(result => {
        dispatch(actManageOrdersByIdSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageOrdersByIdFailed(error));
      });
  }
}
const actManageOrdersByIdRequest = () => {
  return {
    type: ActionType.ORDERS_BYID_MANAGEMENT_REQUEST,
  }
};
const actManageOrdersByIdSuccess = data => {
  return {
    type: ActionType.ORDERS_BYID_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageOrdersByIdFailed = error => {
  return {
    type: ActionType.ORDERS_BYID_MANAGEMENT_FAILED,
    payload: error
  }
};

export const actUpdateStatusOrder = (id) => {
  let data = JSON.stringify({
    "order_status": "Đã nhận được hàng",
    "payment_method": "Ví DigitalPay"
  });
  return (dispatch) => {
    dispatch(actUpdateStatusRequest());
    api.put(`/orders/${id}`, data, {headers: { 
      'Content-Type': 'application/json'
    }})
      .then(result => {
        dispatch(actUpdateStatusSuccess(result.data));
      })
      .catch(error => {
        dispatch(actUpdateStatusFailed(error));
      });
  }
}
const actUpdateStatusRequest = () => {
  return {
    type: ActionType.UPDATE_STATUS_MANAGEMENT_REQUEST,
  }
};
const actUpdateStatusSuccess = data => {
  return {
    type: ActionType.UPDATE_STATUS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actUpdateStatusFailed = error => {
  return {
    type: ActionType.UPDATE_STATUS_MANAGEMENT_FAILED,
    payload: error
  }
};