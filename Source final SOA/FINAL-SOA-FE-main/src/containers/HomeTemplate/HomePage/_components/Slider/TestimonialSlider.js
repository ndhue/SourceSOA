import React, { useState } from 'react';
import Slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function HomeTestimonialSlider() {
  const settings = {
    infinite: true,
    className: "home-testimonial-slider",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  const [videoUrl, setVideoUrl] = useState("");

  const sliderData = [
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg",
      job: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png",
      quote: "We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.",
      url: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg",
      job: "Tim and Dan Joo, Co-Founders",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png",
      quote: "When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does.",
      url: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg",
      job: "Caitlin Tormey, Chief Commercial Officer",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png",
      quote: "We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day.",
      url: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl"
    },
    {
      img: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg",
      job: "Kay Kim, Co-Founder",
      logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png",
      quote: "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working.",
      url: "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw"
    },
  ];

  const select = item => { return document.querySelector(item) };

  const handlePlayVideo = url => {
    setVideoUrl(url);
    select(".testimonial-video-bg")?.classList.add("show-video");
    select(".orca-video").autoplay = true;
    select(".orca-video").load();
  }

  window.addEventListener('mouseup', function (e) {
    if (select(".testimonial-video-bg") && select(".orca-video") && e.target != select(".orca-video")) {
      select(".testimonial-video-bg").classList.remove("show-video");
      select(".orca-video").autoplay = false;
      select(".orca-video").pause();
    }
  });

  const handleRenderSlider = () => {
    return sliderData.map((slide, index) => {
      return (
        <div key={index} className='slider-testimonial-item'>
          <div className='row w-100 m-0 align-items-center'>
            <div className='col-5 p-0 slider-testimonial-img'>
              <img className='w-100' src={slide.img} onClick={()=>{handlePlayVideo(slide.url)}}></img>
              <span onClick={()=>{handlePlayVideo(slide.url)}}></span>
            </div>
            <div className='col-7 slider-testimonial-content' style={{ padding: "0 60px" }}>
              <h5>{slide.job}<span>
                <img alt="Company logo" src={slide.logo}></img>
              </span></h5>
              <blockquote><i>"{slide.quote}"</i></blockquote>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <Slider {...settings}>
        {handleRenderSlider()}
      </Slider>
      <div className='testimonial-video-bg'>
        <div className='testimonial-video'>
          <video className="orca-video" controls preload="metadata" crossOrigin="anonymous">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}