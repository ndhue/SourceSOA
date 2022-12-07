import React, { useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { actFetchProductsData } from 'containers/HomeTemplate/ShopArtPage/modules/actions';
import VND from 'components/CurrencyFormat';
export default function HomeServicesSlider() {
  const dispatch = useDispatch();

  const data = useSelector(state => state.productsManagementReducer.data);
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const settings = {
    infinite: true,
    className: "home-slider",
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleRenderSlider = () => {
    return productsData?.filter(product => product.status == 'Còn hàng')?.map((slide, index) => {
      return (
        <div key={index} className='position-relative slider-item'>
          <a href={`/detail/`+`${slide.product_id}`}>
          <img src={`http://localhost:9090/file/`+`${slide.product_image}`}></img></a>
          <div className='slider-info position-absolute'>
            <p className='font-weight-bold mb-1'>{slide.product_name}</p>
            <h4>{VND.format(slide.price)}</h4>
          </div>
        </div>
      )
    })
  }

  return (
    <Slider {...settings}>
      {handleRenderSlider()}
    </Slider>
  );
}
