import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchUsersDataByID } from '../PersonInfoPage/modules/actions';
import './style.css';
export default function DetailOrderPage() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")).user_id : 0;

  const data = useSelector(state => state.usersInfoManagementReducer.data);
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    dispatch(actFetchUsersDataByID(userId));
  }, []);
  
  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  if(userInfo){
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Chi tiết đơn hàng</h3>
   <div className="checkout_section" id="accordion">
  <div className="container">
    <div className="checkout_form">
      <div className="row">
        <div className="col-lg-7 col-md-6">
          <form action="#">
            <h3>Thông tin thanh toán</h3>
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
              <label> Phone</label>
              <input type="text" value={userInfo.phone} disabled/>
            </div>
            <div className="checkout_form_input">
              <label> Trạng thái <span>*</span></label>
              <input type="text" />
            </div>
          </form>
        </div>
       
        <div className="col-lg-5 col-md-6">
          <div className="order_table_right">
            <form action="#">
              <h3>Đơn của bạn</h3>
              <div className="order_table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Đơn của bạn</th>
                      <th className="text-right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Slim Collarless Blaze </td>
                      <td className="text-right"> $75.20</td>
                    </tr>
                    <tr>
                      <td> Denim Kimono Jacket   </td>
                      <td className="text-right"> $50.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    
                    <tr className="order_total">
                      <th>Thành tiền</th>
                      <td className="text-right">$225.60</td>
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