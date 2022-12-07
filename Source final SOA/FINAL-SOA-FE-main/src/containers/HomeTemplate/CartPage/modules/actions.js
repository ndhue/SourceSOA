import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchCartData = (user_id) => {
  return (dispatch) => {
    dispatch(actManageCartRequest());
    api.get(`/carts/usercart/${user_id}`)
      .then(result => {
          dispatch(actManageCartSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageCartFailed(error));
      });
  }
}

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

const actManageCartRequest = () => {
  return {
    type: ActionType.CART_MANAGEMENT_REQUEST,
  }
};

const actManageCartSuccess = data => {
  return {
    type: ActionType.CART_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageCartFailed = error => {
  return {
    type: ActionType.CART_MANAGEMENT_FAILED,
    payload: error
  }
};

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

export const actDeleteProductCart = (user_id, product_id) => {
  console.log(user_id, product_id);
  return (dispatch) => {
    dispatch(actDeleteProductRequest());
    api.delete(`/carts/${user_id}/${product_id}`)
      .then(result => {
        dispatch(actDeleteProductSuccess());
        localStorage.removeItem(`${product_id}+${user_id}`);
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