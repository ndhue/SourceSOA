import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchProductsData} from './modules/actions';
import './style.css';
import VND from 'components/CurrencyFormat';
export default function ShopArtPage() {
  
  const dispatch = useDispatch();
  const data = useSelector(state => state.productsManagementReducer.data);
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const handleRenderTable = () => {
    return productsData?.filter(product => product.status == 'Còn hàng')?.map((product) => {
      return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-6 " key={product.product_id}>
          <form>
            <div className="single_product">
              <div className="product_thumb">
                <a href={`/detail/`+`${product.product_id}`}>
                  <img className="primary_img" src={`http://localhost:9090/file/`+`${product.product_image}`} alt="consectetur" />
                </a>
              </div>
              <div className="product_content grid_content text-center">
                <h4 className="product_name"><a href={`/detail/`+`${product.product_id}`}>{product.product_name}</a></h4>
                <div className="price_box">
                  <span className="current_price">{VND.format(product.price)}</span>
                </div>
                <div className="add_to_cart">
                  <button className="btn btn-primary" type='submit' data-tippy="Add To Cart" data-tippy-inertia="true" data-tippy-delay={50} data-tippy-arrow="true" data-tippy-placement="top">Thêm giỏ hàng</button>
                </div>
              </div>
            </div>
          </form>
        </div>  
      )
    })
  }
  return (
    <div className='container cover'>
      <h3 className='text-center my-3 user-title'>Cửa hàng</h3>
      <div className="shop_section shop_reverse">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <aside className="sidebar_widget">
                <div className="widget_inner">
                  <div className="widget_list widget_categories">
                    <ul>
                      <li className="widget_sub_categories"><a href="/" data-toggle="collapse" data-target="#men">Phân loại</a>
                        <ul className="widget_dropdown_categories collapse show" id="men">
                          <li><a href="#"> Tác phẩm mới </a></li>
                          <li><a href="#">Fantasy </a></li>
                          <li><a href="#">Potrait</a></li>
                          <li><a href="#">Background</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="row shop_wrapper">
                {handleRenderTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
