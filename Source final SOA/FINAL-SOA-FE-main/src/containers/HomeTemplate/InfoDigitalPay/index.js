import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchBalanceData } from '../PayPage/modules/actions';
import { actFetchUsersDataByID } from '../PersonInfoPage/modules/actions';
import './style.css';
import VND from 'components/CurrencyFormat';
export default function InfoDigitalPay(props) {
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const balanceData = useSelector(state => state.paymentReducer.digitalPay);
  const [balance, setBalanceData] = useState(null);

  const data = useSelector(state => state.usersInfoManagementReducer.data);
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    dispatch(actFetchBalanceData(userId));
    dispatch(actFetchUsersDataByID(userId));
  }, []);
  
  useEffect(() => {
    setBalanceData(balanceData);
  }, [balanceData]);

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  if(userInfo && balance){
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Thông tin ví Digital Pay</h3>
      <div className="checkout_section" id="accordion">
        <div className="container">
          <div className="checkout_form">
            <div className="row">
              <div className="col-lg-7 col-md-6">
                <form action="#">
                  <h3>Thông tin ví</h3>
                  <div className="checkout_form_input">
                    <label>Họ và tên</label>
                    <input type="text" value={userInfo.fullname} disabled/>
                  </div>    
                  <div className="checkout_form_input">
                    <label>Địa chỉ</label>
                    <input type="text" value={userInfo.address} disabled/>
                  </div>
                  <div className="checkout_form_input">
                    <label> Email</label>
                    <input type="text" value={userInfo.email} disabled/>
                  </div>
                  <div className="checkout_form_input">
                    <label> Số điện thoại</label>
                    <input type="text" value={userInfo.phone} disabled/>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="order_table_right">
                  <form action="#">
                    <div className="order_table table-responsive">
                      <table>
                          <tr><th>Ví điện tử của bạn</th></tr>
                        <tfoot>
                          <tr className="order_total">
                            <th>Số dư</th>
                            <td className="text-right">{VND.format(balance.balance)}</td>
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
    </div>
  )
}}
