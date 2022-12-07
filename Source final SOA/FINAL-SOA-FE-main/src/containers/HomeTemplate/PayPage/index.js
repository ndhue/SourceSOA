import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchCartData, actFetchProductsData } from '../CartPage/modules/actions';
import { actPayToCart, actFetchBalanceData } from './modules/actions';
import VND from 'components/CurrencyFormat';
import './style.css';
import { useHistory } from 'react-router-dom';
export default function PayPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  
  const data = useSelector(state => state.cartManagementReducer.data);
  const [cartData, setCartData] = useState(null);

  const Pdata = useSelector(state => state.cartManagementReducer.listProduct);
  const [productsData, setProductsData] = useState(null);

  const total = useSelector(state => state.cartManagementReducer.total);
  
  const balanceData = useSelector(state => state.paymentReducer.balance);
  const [balance, setBalanceData] = useState(null);

  const link = `/infopay/${userId}`;

  useEffect(() => {
    dispatch(actFetchCartData(userId));
    dispatch(actFetchProductsData());
    dispatch(actFetchBalanceData(userId));
  }, []);
  
  useEffect(() => {
    setCartData(data);
  }, [data]);

  useEffect(() => {
    setProductsData(Pdata);
  }, [Pdata]);

  useEffect(() => {
    setBalanceData(balanceData);
  }, [balanceData]);


  const handleOnSubmit = (e) => {
    if(total > parseInt(balance)){
      if(window.confirm('Số dư của bạn không đủ để thanh toán')){
        history.push(`/cart/${userId}`);
        e.preventDefault();
      }
    }else if (window.confirm(`Xác nhận thanh toán?`)) {
      e.preventDefault();
      dispatch(actPayToCart(userId, "digitalpay"));
      window.alert('Thanh toán thành công');
      history.push(`/order/${userId}`);
    }
  };
  
  const handleRenderListProduct = () =>{
    productsData?.map((product, index) => {
      return(
        <tr key={index+1}>
          <td>hong thay</td>
          <td>{product.product_name}</td>
          <td className="text-right">{product.price}</td>
        </tr>
      )
    })
  }
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Thanh toán</h3>
      <div className="checkout_section" id="accordion">
        <div className="container">
          <div className="checkout_form">
            <div className="row pt-4">
              <div className="col-lg-7 col-md-6">
              <div className="order_table_right">
                  <form action="#">
                    <div className="order_table table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Đơn của bạn</th>
                            <th className="text-right">Tổng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {handleRenderListProduct()}
                        </tbody>
                        <tfoot>
                          <tr className="order_total">
                            <th>Thành tiền</th>
                            <td className="text-right">{VND.format(total)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="place_order_btn">
                      <button className="btn btn-primary w-100" onClick={handleOnSubmit}>Thanh toán</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="order_table_right">
                  <form action="#">
                    <div className="order_table table-responsive">
                      <table>
                          <thead>
                            <tr>
                              <th>Ví điện tử của bạn</th>
                            </tr>
                          </thead>
                        <tfoot>
                          <tr className="order_total">
                            <th>Số dư</th>
                            <td className="text-right">{VND.format(balance)}</td>
                          </tr>
                          <tr>
                            <th><button className="btn btn-primary btn-sm" href={link}>Chi tiết</button></th>
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
}
