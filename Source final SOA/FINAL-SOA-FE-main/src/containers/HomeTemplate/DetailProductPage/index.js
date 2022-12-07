import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchProductDetail, actAddProductToCart } from './modules/actions';
import { actFetchCartData, actFetchProductsData } from '../CartPage/modules/actions';
import VND from 'components/CurrencyFormat';
import Loading from "components/Loading";
import './style.css'
export default function DetailProductPage(props) {
  const userId = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")).user_id : 0;
  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);

  const handleLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return (
      message && (
        <div className="alert alert-danger mt-3 text-center">{message}</div>
      )
    );
  };
  
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const data = useSelector(state => state.productDetailReducer.productData);
  const cData = useSelector(state => state.cartManagementReducer.data);
  const [cartData, setCartData] = useState(null);

  const Pdata = useSelector(state => state.cartManagementReducer.listProduct);
  const [productsData, setProductsData] = useState('');

  useEffect(() => {
    dispatch(actFetchProductDetail(productId));
    dispatch(actFetchCartData(userId));
    dispatch(actFetchProductsData());
  }, []);

  useEffect(()=>{
    setCartData(cData);
    setProductsData(Pdata);
  }, [Pdata])
  
  const handleOnSubmit = (e) => {
    if(localStorage.getItem("UserInfo")){
      if(localStorage.getItem(`${productId}+${userId}`)){
        alert('Sản phẩm đã tồn tại');
        e.preventDefault();
      }
      else if(window.confirm(`Bạn có muốn thêm sản phẩm?`)){
          e.preventDefault();
          dispatch(actAddProductToCart(productId, userId));
          alert('Thêm sản phẩm thành công!');
        }
    } else{
      alert('Bạn cần đăng nhập mới có thể thêm giỏ hàng');
        e.preventDefault();
    }
    }; 

  // const handleOnSubmit = (e) => {
  //   if(window.confirm(`Bạn có muốn thêm sản phẩm?`)){
  //       e.preventDefault();
  //       dispatch(actAddProductToCart(productId, userId, productsData));
  //   }; 
  // }
  if(data){
  return (
    <div>
      <h3 className='text-center my-3 user-title'>Chi tiết sản phẩm</h3>
      <section className="product_details mb-135">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className='container cover-img'>
                    <img  src={`http://localhost:9090/file/`+`${data.product_image}`} alt='product-image' className="primary_img" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="product_d_right pt-5 pl-2">
                       <form onSubmit={handleOnSubmit}>
                            <h1>{data.product_name}</h1>
                            <div className="price_box pt-3">
                                <span className="current_price">{VND.format(data.price)}</span>
                            </div>
                            <div className="product_desc">
                                {data.description}
                            </div>
                            <div className="product_variant">
                            <div className=" d-flex">
                                <button className="btn-primary btn-submit"><i className="ion-android-add" type='submit'></i> Thêm vào giỏ hàng</button>
                                </div>  
                                <div>{handleLoading()}</div>
                            </div>
                            <div className="product_sku">
                                <p><span>SKU: </span> #ABC123456</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

<div className="product_d_info mb-118">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="product_d_inner">
          <div className="product_info_button border-bottom">
            <ul className="nav" role="tablist">
              <li>
                <a className="active" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">Mô tả</a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="info" role="tabpanel">
              <div className="product_info_content">
                <p>Coupling a blended linen construction with tailored style, the River Island HR Jasper Blazer will imprint a touch of dapper charm into your after-dark wardrobe. <br /> Our model wearing a size medium blazer, and usually takes a size medium/38L shirt. <br /> He is 6’2 1/2” (189cm) tall with a 38” (96 cm) chest and a 31” (78 cm) waist.</p>
               
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  )}
  return (
    <></>
  )
}
