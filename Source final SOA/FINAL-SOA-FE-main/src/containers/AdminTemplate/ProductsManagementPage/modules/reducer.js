import * as ActionTypes from './constants';

const initialState = {
  data: null,
  loading: false,
  error: null,

  deletionLoading: false,
  deletionError: null
}

const productsManagementReducerByAdmin = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.PRODUCTS_MANAGEMENT_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_MANAGEMENT_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCTS_MANAGEMENT_FAILED: {
      state.data = null;
      state.loading = false;
      state.error = payload.response.data.message;
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

export default productsManagementReducerByAdmin;