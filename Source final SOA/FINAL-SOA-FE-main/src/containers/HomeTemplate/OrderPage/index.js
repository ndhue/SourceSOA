import React, { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchOrdersDataById, actUpdateStatusOrder } from './modules/actions';
import './style.css'
export default function OrderPage(props) {
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const data = useSelector(state => state.ordersManagementReducer.data);
  const [ordersData, setOrdersData] = useState(null);

  useEffect(() => {
    dispatch(actFetchOrdersDataById(userId));
  }, []);

  useEffect(() => {
    setOrdersData(data);
  }, [data]);

  const handleOnSubmit = (id) => {
    if (window.confirm("Xác nhận cập nhật trạng thái?")) {
      dispatch(actUpdateStatusOrder(id));
      window.location.reload();
    }
  }
  const handleButton = (order) => {
    if(order.order_status === "Đã thanh toán"){
      return(
        <button className='btn btn-primary' onClick={()=>{
          handleOnSubmit(order.order_id)
        }}>Xác nhận đã nhận hàng</button>
      )
    }else{
      return(
        <button className='btn btn-primary' onClick={()=>{
          handleOnSubmit(order.order_id)
        }} disabled >Đã xác nhận</button>
      )
    }
  }
  const handleRenderTable = () => {
    return ordersData?.map((order, index) => {
      const link = `/detail-order/${order.order_id}`;
      return (
        <tr key={order.order_id}>
          <th>{index + 1}</th>
          <td>{order.order_date}</td>
          <td><span className='text-center'>{order.order_status}</span></td>
          <td><a className='btn btn-primary' href={link}>Chi tiết</a></td>
          <td>{handleButton(order)}</td>
        </tr>
      )
    })
  }
  
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Đơn hàng</h3>
      <div className="shopping_cart_area">
        <div className="container">
                <div className="cart_page_inner mb-60">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart_page_tabel">
                            <table className="table table-striped mt-5 text-center">
                              <thead>
                                <tr>
                                  <th scope="col">ID đơn hàng</th>
                                  <th scope="col">Ngày thực hiện</th>
                                  <th scope="col">Trạng thái</th>
                                  <th scope="col">Chi tiết</th>
                                  <th scope="col">Xác nhận</th>
                                </tr>
                              </thead>
                              <tbody>
                                {handleRenderTable()}
                              </tbody>
                            </table>
                          </div>
                         </div>
                     </div>
                  </div>  
                </div>
              </div>
    </div>
  )
}