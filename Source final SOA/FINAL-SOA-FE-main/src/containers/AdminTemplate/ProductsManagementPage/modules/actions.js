import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchProductsData = () => {
  return (dispatch) => {
    dispatch(actManageProductsRequest());
    api.get("/products")
      .then(result => {
        const uncheckedProduct = result.data.filter(p => p.status === "Chờ duyệt");
        const checkedProduct = result.data.filter(p => p.status !== "Chờ duyệt");
        dispatch(actManageProductsSuccess(uncheckedProduct.concat(checkedProduct)));
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

export const actDeleteProduct = id => {
  return (dispatch) => {
    dispatch(actDeleteProductRequest());
    api.delete(`/products/${id}`)
      .then(result => {
        dispatch(actDeleteProductSuccess());
        alert("Deleted successfully! Refresh & change.")
      })
      .catch(error => {
        dispatch(actDeleteProductFailed(error));
      });
  }
}
const actDeleteProductRequest = () => {
  return {
    type: ActionType.PRODUCTS_DELETE_REQUEST,
  }
};
const actDeleteProductSuccess = data => {
  return {
    type: ActionType.PRODUCTS_DELETE_SUCCESS,
    payload: data
  }
};
const actDeleteProductFailed = error => {
  return {
    type: ActionType.PRODUCTS_DELETE_FAILED,
    payload: error
  }
};