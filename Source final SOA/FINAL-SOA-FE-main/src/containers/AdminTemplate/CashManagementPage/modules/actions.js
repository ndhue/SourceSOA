import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchTransactionsData = () => {
  return (dispatch) => {
    dispatch(actManageTransactionsRequest());
    api.get("/transactions")
      .then(result => {
        dispatch(actManageTransactionsSuccess(result.data));
      })
      .catch(error => {
        dispatch(actManageTransactionsFailed(error));
      });
  }
}
const actManageTransactionsRequest = () => {
  return {
    type: ActionType.TRANSACTIONS_MANAGEMENT_REQUEST,
  }
};
const actManageTransactionsSuccess = data => {
  return {
    type: ActionType.TRANSACTIONS_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageTransactionsFailed = error => {
  return {
    type: ActionType.TRANSACTIONS_MANAGEMENT_FAILED,
    payload: error
  }
};