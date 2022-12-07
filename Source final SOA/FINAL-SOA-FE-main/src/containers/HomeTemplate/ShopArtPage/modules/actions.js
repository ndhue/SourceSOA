import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchProductsData = () => {
  return (dispatch) => {
    dispatch(actManageProductsRequest());
    api.get("/products")
      .then(result => {
        dispatch(actManageProductsSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageProductsFailed(error));
      });
  }
}
const actManageProductsRequest = () => {
  return {
    type: ActionType.PRODUCTS_MANAGEMENT_REQUEST,
  }
};
const actManageProductsSuccess = data => {
  return {
    type: ActionType.PRODUCTS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageProductsFailed = error => {
  return {
    type: ActionType.PRODUCTS_MANAGEMENT_FAILED,
    payload: error
  }
};
