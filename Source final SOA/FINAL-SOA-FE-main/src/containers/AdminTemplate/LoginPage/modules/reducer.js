import * as ActionType from "./constants";

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userLoginReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionType.LOGIN_REQUEST: {
      state.user = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionType.LOGIN_SUCCESS: {
      state.user = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionType.LOGIN_FAILED: {
      state.user = null;
      state.loading = true;
      state.error = payload.response.message;
      return { ...state };
    }
    case ActionType.LOGIN_RESET: {
      state.error = null;
      return { ...state };
    }
    default:
      return { ...state }
  }
}

export default userLoginReducer;