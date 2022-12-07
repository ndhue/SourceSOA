import * as ActionTypes from './constants';

const initialState = {
  userData:null,
  message: null,
  loading: false,
}

const modalSellerReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.MODAL_SELLER_REQUEST: {
      state.message = null;
      state.loading = true;
      return { ...state }
    }
    case ActionTypes.MODAL_SELLER_ADD_SUCCESS: {
      state.loading = false;
      state.message = "Đăng ký người bán thành công!";
      return { ...state }
    }
    case ActionTypes.MODAL_SELLER_EDIT_SUCCESS: {
      state.loading = false;
      state.message = "Chỉnh sửa thành công";
      return { ...state }
    }
    case ActionTypes.MODAL_SELLER_ADD_FAILED || ActionTypes.MODAL_SELLER_EDIT_FAILED: {
      state.loading = false;
      state.message = payload.response.data.message;
      return { ...state }
    }
    case ActionTypes.MODAL_SELLER_RESET: {
      state.message = null;
      return { ...state }
    }
    case ActionTypes.USERS_MANAGEMENT_REQUEST: {
      state.userData = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USERS_MANAGEMENT_SUCCESS: {
      state.userData = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.USERS_MANAGEMENT_FAILED: {
      state.userData = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }

    default:
      return { ...state }
  }
}

export default modalSellerReducer;