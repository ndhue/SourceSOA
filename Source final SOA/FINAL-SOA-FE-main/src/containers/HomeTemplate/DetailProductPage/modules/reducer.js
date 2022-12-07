import * as ActionTypes from './constants';

const initialState = {
  productData: null,
  product: null,
  loading: false,
  error: null,
}

const productDetailReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.PRODUCT_DETAIL_REQUEST: {
      state.productData = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCT_DETAIL_SUCCESS: {
      state.productData = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCT_DETAIL_FAILED: {
      state.productData = null;
      state.loading = false;
      state.error = payload.response.message;
      return { ...state };
    }
    case ActionTypes.CART_MANAGEMENT_REQUEST: {
      state.product = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CART_MANAGEMENT_SUCCESS: {
      state.product = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CART_MANAGEMENT_FAILED: {
      state.product = null;
      state.loading = false;
      state.error = payload.response.message;
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default productDetailReducer;