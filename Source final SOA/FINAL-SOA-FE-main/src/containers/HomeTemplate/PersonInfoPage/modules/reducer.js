import * as ActionTypes from './constants';

const initialState = {
  data: null,
  loading: false,
  error: null,
}

const usersInfoManagementReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.USER_INFO_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USER_INFO_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USER_INFO_FAILED: {
      state.data = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    case ActionTypes.USER_INFO_EDIT_SUCCESS: {
      state.loading = false;
      state.message = "Edit successfully! Refresh & change.";
      return { ...state }
    }
    case ActionTypes.USER_INFO_EDIT_FAILED: {
      state.loading = false;
      state.message = payload.response.data.message;
      return { ...state }
    }
    default:
      return { ...state };
  }
}

export default usersInfoManagementReducer;