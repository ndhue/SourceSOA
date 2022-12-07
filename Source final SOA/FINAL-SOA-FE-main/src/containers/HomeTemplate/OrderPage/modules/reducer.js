import * as ActionTypes from './constants';

const initialState = {
  data: null,
  orderById: null,
  orderUpdate: null,
  product: null,
  loading: false,
  error: null,

  deletionLoading: false,
  deletionError: null
}

const ordersManagementReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.ORDERS_MANAGEMENT_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ORDERS_MANAGEMENT_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ORDERS_MANAGEMENT_FAILED: {
      state.data = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    case ActionTypes.ORDERS_BYID_MANAGEMENT_REQUEST: {
      state.orderById = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ORDERS_BYID_MANAGEMENT_SUCCESS: {
      state.orderById = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.ORDERS_BYID_MANAGEMENT_FAILED: {
      state.orderById = null;
      state.loading = false;
      state.error = payload.response.orderById.message;
      return { ...state };
    }
    case ActionTypes.UPDATE_STATUS_MANAGEMENT_REQUEST: {
      state.orderUpdate = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.UPDATE_STATUS_MANAGEMENT_SUCCESS: {
      state.orderUpdate = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.UPDATE_STATUS_MANAGEMENT_FAILED: {
      state.orderUpdate = null;
      state.loading = false;
      state.error = payload.response.orderUpdate.message;
      return { ...state };
    }

    default:
      return { ...state };
  }
}

export default ordersManagementReducer;