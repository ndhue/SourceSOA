import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchCartData, actFetchProductsData, actDeleteProductCart } from './modules/actions';
import './style.css';
import VND from 'components/CurrencyFormat';
export default function CartPage(props) {
  
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const data = useSelector(state => state.cartManagementReducer.data);
  const [cartData, setCartData] = useState(null);

  const Pdata = useSelector(state => state.cartManagementReducer.listProduct);
  const [productsData, setProductsData] = useState(null);
  const total = VND.format(useSelector(state => state.cartManagementReducer.total));
  
  const linkPay = `/pay/${userId}`;
  useEffect(() => {
    dispatch(actFetchCartData(userId));
    dispatch(actFetchProductsData());
  }, []);
  
  useEffect(() => {
    setCartData(data);
  }, [data]);

  useEffect(() => {
    setProductsData(Pdata);
  }, [Pdata]);

  const handleDeleteProduct = (user_id, product_id) => {
    if (window.confirm("Bạn muốn xóa sản phẩm?")) {
      dispatch(actDeleteProductCart(user_id, product_id));
      window.location.reload();
    }
  }
  
  const handleRenderTable = () => {
    return productsData?.map((product,index) => {
      return (
        <tr className="border-top text-center" key={product.product_id}>
            <td>
                <div className="cart_product_thumb">
                {index+1}
                </div>
            </td>
            <td>
                <div className="cart_product_thumb">
                {product.product_name}
                </div>
            </td>
            <td><div className='product-cover'>
            <img className="product-image" src={`http://localhost:9090/file/`+`${product.product_image}`} alt='for sale' /></div>
            </td>
            <td></td>
            <td>
                <div className="cart_product_price">
                    <span>{VND.format(product.price)}</span>
                </div>
            </td>
            <td>
                <button className='btn btn-del mx-1' onClick={() => { handleDeleteProduct(userId, product.product_id) }}>×</button>
            </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h3 className='text-center my-3 user-title'>Giỏ hàng</h3>
      <div className="shopping_cart_area">
        <div className="container">
                <div className="cart_page_inner mb-60">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart_page_tabel">
                                <table>
                                    <thead>
                                        <tr className='text-center'>
                                            <th>STT</th>
                                            <th>Tên</th>
                                            <th>Hình ảnh</th>
                                            <th></th>
                                            <th>Giá</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {handleRenderTable()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart_page_button border-top d-flex justify-content-between">
                                <div className="shopping_cart_btn">
                                    
                                </div>
                                <div className="shopping_continue_btn">
                                    <a href="/shop-art" className="btn btn-primary">TIẾP TỤC MUA SẮM</a>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="grand_totall_area">
                               <div className="grand_totall_inner border-bottom">
                                   <div className="cart_subtotal d-flex justify-content-between">
                                       <p>Tổng </p>
                                       <span>{total}</span>
                                   </div>
                                   <div className="cart_grandtotal d-flex justify-content-between">
                                       <p>Tổng cộng</p>
                                       <span>{total}</span>
                                   </div>
                               </div>
                               <div className="proceed_checkout_btn">
                                   <a className="btn btn-primary" href={linkPay}>Thanh toán</a>
                               </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
        </div>
  )
}
