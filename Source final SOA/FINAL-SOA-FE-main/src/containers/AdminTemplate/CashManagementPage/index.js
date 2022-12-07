import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchBalanceData } from 'containers/HomeTemplate/PayPage/modules/actions';
import { actFetchTransactionsData } from './modules/actions';
import VND from 'components/CurrencyFormat';
import './style.css';
export default function CashManagementPage() {
  const dispatch = useDispatch();
  const balanceData = useSelector(state => state.paymentReducer.balance);
  const [balance, setBalanceData] = useState(null);

  const data = useSelector(state => state.transactionsManagementReducer.data);
  const [transactionsData, setTransactionsData] = useState(null);

  useEffect(() => {
    dispatch(actFetchBalanceData(1));
    dispatch(actFetchTransactionsData());
  }, []);

  useEffect(() => {
    setBalanceData(balanceData);
  }, [balanceData]);

  useEffect(() => {
    setTransactionsData(data);
  }, [data]);

  const handleRenderTable = () => {
    return transactionsData?.map((transaction,index) => {
      return (
        <tr key={index+1}>
          <td>{transaction.transaction_id}</td>
          <td>{transaction.user_id}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.transaction_date}</td>
          <td><button className='btn btn-primary'>Xác nhận thanh toán</button></td>
        </tr>
      )
    })
  }


  if(balance && transactionsData){
  return (
    <div>
      <h1 className='text-center my-5 user-title font-weight-bold'>Ví điện tử Admin</h1>
      <div className="checkout_section" id="accordion">
  <div className="container">
    <div className="checkout_form">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="order_table_right">
            <form action="#">
              <div className="order_table table-responsive">
                <table>
                    <tr>
                      <th>Ví điện tử của bạn</th>
                    </tr>
                  <tfoot>
                    <tr className="order_total">
                      <th>Số dư</th>
                      <td className="text-right">{VND.format(balance)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<h2 className='text-center user-title font-weight-bold'>Lịch sử giao dịch</h2>
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">ID đơn hàng</th>
            <th scope="col">ID người bán</th>
            <th scope="col">Thành tiền</th>
            <th scope="col">Ngày giao dịch</th>
            <th scope="col">Tính năng</th>
          </tr>
        </thead>
        <tbody>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}}
