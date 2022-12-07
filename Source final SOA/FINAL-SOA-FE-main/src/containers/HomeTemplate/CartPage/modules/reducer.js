import * as ActionTypes from './constants';

const initialState = {
  data: null,
  listProduct: null,
  loading: false,
  error: null,
  total: 0,

  deletionLoading: false,
  deletionError: null
}

const cartManagementReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.CART_MANAGEMENT_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CART_MANAGEMENT_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.CART_MANAGEMENT_FAILED: {
      state.data = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_MANAGEMENT_REQUEST: {
      state.listProduct = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_MANAGEMENT_SUCCESS: {
      const list = [];
      let t = 0;
      for(let i=0; i<state.data.length; i++){
        for(let j=0; j<payload.length; j++){
          if(state.data[i].product_id === payload[j].product_id){
            list.push(payload[j]);
            t +=parseInt(payload[j].price);
          }
        }
      }
      state.listProduct = list;
      state.loading = false;
      state.error = null;
      state.total = t;
      return { ...state};
    }
    
    case ActionTypes.PRODUCTS_MANAGEMENT_FAILED: {
      state.listProduct = null;
      state.loading = false;
      state.error = payload.response.listProduct.message;
      state.total = 0;
      return { ...state };
    }

    case ActionTypes.PRODUCTS_DELETE_REQUEST: {
      state.deletionLoading = true;
      state.deletionError = null;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_DELETE_SUCCESS: {
      state.deletionLoading = false;
      state.deletionError = null;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_DELETE_FAILED: {
      state.deletionLoading = false;
      state.deletionError = payload.response.data;
      alert(payload.response.data)
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default cartManagementReducer;