import React from 'react';
import HomeCarousel from '../_components/Carousel';
import HomeServicesSlider from './_components/Slider/ServicesSlider';
import './style.css';

export default function HomePage() {
  return (
    <section className='home-page'>
      <header>
        <HomeCarousel />
        <div className='container position-relative' style={{ height: 550, background: "transparent" }}>
          <div className='position-absolute home-search'>
            <h1 className='home-title font-weight-bold'>THẾ GIỚI DIGITAL ART RỘNG LỚN</h1>
            <h3 className=''><i>Nơi bạn có thể trao đổi tác phẩm của bản thân</i></h3>
            <h3 className=''>Hãy tham gia ngay</h3>
            <a className="nav-link btn btn-success text-white btn-shop p-2" href="/signup" >Khám phá</a>
          </div>
        </div>
      </header>
      <section className='home-partner'>
        <div className='container d-flex justify-content-center align-items-center'>
          <p className='m-0'>Trusted by:</p>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png' alt='Facebook'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png' alt='Google'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png' alt='P&G'></img>
          <img src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png' alt='Paypal'></img>
        </div>
      </section>
      <section className='container'>
        <div className='home-slider-container'>
          <h2>Bán chạy</h2>
          <HomeServicesSlider />
        </div>
      </section>
      <section className='container'>
        <section className="banner_section">
          <div className="container">
            <div className="section_title">
              <h2>Nhiều thể loại</h2>
            </div>
            <div className="banner_container d-flex">
              <div className="single_banner position-relative col-8">
                <img src="assets/img/bg/bg1.png" alt='background1' />
                <figcaption className="banner_text position-absolute">
                  <h3>nhân vật anime <br /> yêu thích</h3>
                  <a className="btn btn-primary" href="shop.html">Khám phá</a>
                </figcaption>
              </div>
              <div className="single_banner position-relative col-4">
                <img src="assets/img/bg/bg2.png" alt='background2' />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className='container'>
        
      </section>
    </section>
  )
}
