import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

const actFetchUsersDataByID = id => {
  return dispatch => {
    dispatch(actUserInfoRequest());
    api.get(`/users/${id}`)
      .then(result => {
        dispatch(actUserInfoSuccess(result.data));
      })
      .catch(error => {
        dispatch(actUserInfoFailed(error));
      });
  }
}

const actEditUsersDataByID = (info, method, id) => {
  return dispatch => {
    if (method == "EDIT") {
      api.put(`/users/${id}`, info)
        .then(result => {
          dispatch(actUserInfoEditSuccess(result.data));
        })
        .catch(error => {
          dispatch(actUserInfoEditFailed(error))
        });
      }
  }
}

const actFetchOrderDataByID = id => {
  return dispatch => {
    dispatch(actOrderDataRequest());
    api.get(`/users/${id}`)
      .then(result => {
        dispatch(actOrderDataSuccess(result.data));
      })
      .catch(error => {
        dispatch(actOrderDataFailed(error));
      });
  }
}

const actUserInfoRequest = () => {
  return {
    type: ActionTypes.USER_INFO_REQUEST,
  }
};
const actUserInfoSuccess = data => {
  return {
    type: ActionTypes.USER_INFO_SUCCESS,
    payload: data
  }
};
const actUserInfoFailed = error => {
  return {
    type: ActionTypes.USER_INFO_FAILED,
    payload: error
  }
};

const actUserInfoEditSuccess = () => ({
  type: ActionTypes.USER_INFO_SUCCESS,
});

const actUserInfoEditFailed = error => ({
  type: ActionTypes.USER_INFO_FAILED,
  payload: error
});

const actOrderDataRequest = () => {
  return {
    type: ActionTypes.USER_INFO_REQUEST,
  }
};
const actOrderDataSuccess = data => {
  return {
    type: ActionTypes.USER_INFO_SUCCESS,
    payload: data
  }
};
const actOrderDataFailed = error => {
  return {
    type: ActionTypes.USER_INFO_FAILED,
    payload: error
  }
};

export { actFetchUsersDataByID, actEditUsersDataByID, actFetchOrderDataByID };