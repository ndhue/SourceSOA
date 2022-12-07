import React from 'react';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function HomeCarousel() {

  const settings = {
    accessibility: false,
    touchMove: false,
    swipe: false,
    pauseOnHover: false,
    draggable: false,
    className: "home-carousel-item",
    dots: false,
    arrows: false,

    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
  };

  return (
    <section className='home-carousel position-absolute'>
      <Slider {...settings}>
        <div>
          <img src='./assets/img/slider/slider1.png'></img>
          
        </div>
        <div>
          <img src='./assets/img/slider/slider2.png'></img>
          
        </div>
        <div>
          <img src='./assets/img/slider/slider3.png'></img>
          
        </div>
      </Slider>
    </section>
  );
}
