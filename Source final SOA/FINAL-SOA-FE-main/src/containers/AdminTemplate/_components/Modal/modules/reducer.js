import * as ActionTypes from './constants';

const initialState = {
  message: null,
  loading: false,
}

const modalReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.MODAL_REQUEST: {
      state.message = null;
      state.loading = true;
      return { ...state }
    }
    case ActionTypes.MODAL_ADD_SUCCESS: {
      state.loading = false;
      state.message = "Create account successfully! Refresh & change.";
      return { ...state }
    }
    case ActionTypes.MODAL_EDIT_SUCCESS: {
      state.loading = false;
      state.message = "Edit successfully! Refresh & change.";
      return { ...state }
    }
    case ActionTypes.MODAL_ADD_FAILED || ActionTypes.MODAL_EDIT_FAILED: {
      state.loading = false;
      state.message = payload.response.data.message;
      return { ...state }
    }
    case ActionTypes.MODAL_RESET: {
      state.message = null;
      return { ...state }
    }
    default:
      return { ...state }
  }
}

export default modalReducer;