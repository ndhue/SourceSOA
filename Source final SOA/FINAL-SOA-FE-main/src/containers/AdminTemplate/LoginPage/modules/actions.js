import api from 'utils/apiUtils';
import * as ActionType from './constants';
const qs = require('qs');

export const actLogin = (username,password, history) => {
  const data = qs.stringify({
    'username': username,
    'password': password
  })
  return (dispatch) => {
    dispatch(actLoginRequest());
    api.post("/login",data, {headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
    .then(result => {
      if (result.data.role === "Customer" || result.data.role === "Seller") {
        dispatch(actLoginSuccess(result.data));
        localStorage.setItem("UserInfo", JSON.stringify(result.data));
        history.push('/');
        window.location.reload();
      } else if (result.data.role == "Admin") {
        dispatch(actLoginSuccess(result.data));
        localStorage.setItem("UserInfo", JSON.stringify(result.data));
        history.replace("/users-management");
        window.location.reload();
      }
    })
      .catch(error => {
        dispatch(actLoginFailed(error));
        alert('Tài khoản hoặc mật khẩu sai!');
        window.location.reload();
      });
  }
}

const actLoginRequest = () => {
  return {
    type: ActionType.LOGIN_REQUEST,
  }
};
const actLoginSuccess = (data) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: data
  }
};
const actLoginFailed = (error) => {
  return {
    type: ActionType.LOGIN_FAILED,
    payload: error
  }
};

export const actLoginReset = () => {
  return {
    type: ActionType.LOGIN_RESET
  }
}