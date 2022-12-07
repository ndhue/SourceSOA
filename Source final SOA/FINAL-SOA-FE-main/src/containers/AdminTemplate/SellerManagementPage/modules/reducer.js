import * as ActionTypes from './constants';

const initialState = {
  data: null,
  userInfo: null,
  loading: false,
  error: null,

  deletionLoading: false,
  deletionError: null,
}

const sellersManagementReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.SELLERS_MANAGEMENT_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.SELLERS_MANAGEMENT_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }

    case ActionTypes.SELLERS_MANAGEMENT_FAILED: {
      state.data = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    case ActionTypes.USERS_MANAGEMENT_REQUEST: {
      state.userInfo = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USERS_MANAGEMENT_SUCCESS: {
      state.userInfo = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USERS_MANAGEMENT_FAILED: {
      state.userInfo = null;
      state.loading = false;
      state.error = payload.response.userInfo.message;
      return { ...state };
    }

    default:
      return { ...state };
  }
}

export default sellersManagementReducer;