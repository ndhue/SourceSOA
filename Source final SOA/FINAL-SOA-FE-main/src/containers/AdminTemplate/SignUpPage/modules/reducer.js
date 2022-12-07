import * as ActionTypes from './constants';

const initialState = {
  message: null,
  loading: false,
}

const signUpReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.SIGN_UP_REQUEST: {
      state.message = null;
      state.loading = true;
      return { ...state }
    }
    case ActionTypes.SIGN_UP_SUCCESS: {
      state.loading = false;
      state.message = "Sign up successfully!";
      return { ...state }
    }
    case ActionTypes.SIGN_UP_FAILED: {
      state.loading = false;
      state.message = payload.response.data.message;
      return { ...state }
    }
    case ActionTypes.SIGN_UP_RESET: {
      state.message = null;
      return { ...state }
    }
    default:
      return { ...state }
  }
}

export default signUpReducer;