import * as ActionTypes from './constants';

const initialState = {
  data: null,
  digitalPay: null,
  balance: 0,
  loading: false,
  error: null,
}

const paymentReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    
    case ActionTypes.PAY_MANAGEMENT_REQUEST: {
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PAY_MANAGEMENT_SUCCESS: {
      state.data = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PAY_MANAGEMENT_FAILED: {
      state.data = 0;
      state.digitalPay = 0;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    case ActionTypes.BALANCE_MANAGEMENT_REQUEST: {
      state.digitalPay = null;
      state.balance = 0;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.BALANCE_MANAGEMENT_SUCCESS: {
      state.digitalPay = payload;
      state.balance = payload.balance;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.BALANCE_MANAGEMENT_FAILED: {
      state.digitalPay = null;
      state.balance = 0;
      state.loading = false;
      state.error = payload.response.digitalPay.message;
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default paymentReducer;