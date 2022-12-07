import api from 'utils/apiUtils';
import * as ActionTypes from './constants';

export const actSignUp = info => {
  return (dispatch) => {
    dispatch(actSignUpRequest());
    api.post("/sellerpendings", info)
      .then(result => {
        dispatch(actSignUpSuccess(result.data));
      })
      .catch(error => {
        dispatch(actSignUpFailed(error))
      });
  };
};

const actSignUpRequest = () => ({
  type: ActionTypes.SIGN_UP_REQUEST
});

const actSignUpSuccess = () => ({
  type: ActionTypes.SIGN_UP_SUCCESS,
});

const actSignUpFailed = error => ({
  type: ActionTypes.SIGN_UP_FAILED,
  payload: error
});

export const actResetSignUpMessenger = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SIGN_UP_RESET
    });
  };
};