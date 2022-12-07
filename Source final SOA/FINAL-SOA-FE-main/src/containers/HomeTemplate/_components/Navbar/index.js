import './style.css';
import React, { useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from './img/logo.png';
export default function NavbarHome() {
  const userId = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")).user_id : 0;
  const linkToInfo = `/user-info/${userId}`;
  const linkToCart = `/cart/${userId}`;
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("UserInfo") ? true : false);

  const selectALl = items => { return document.querySelectorAll(items) };
  const select = dom => { return document.querySelector(dom) }


  const handleRenderLoginSpace = () => {
    if (localStorage.getItem("UserInfo") && JSON.parse(localStorage.getItem("UserInfo")).role === "Admin") {
      return (
        <>
          <li className='nav-item mx-2'>
          <Link className="nav-link btn btn-primary" style={{ cursor: "pointer" }} onClick={() => {
            if (window.confirm("Đăng xuất?")) {
              localStorage.removeItem("UserInfo");
              setIsLogin(false);
            }
          }}>Đăng xuất</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-primary" to="/users-management">Bảng điều khiển</Link>
          </li>
        </>
      )
    } else if (localStorage.getItem("UserInfo") && (JSON.parse(localStorage.getItem("UserInfo")).role === "Customer" || JSON.parse(localStorage.getItem("UserInfo")).role === "Seller")) {
      return (
        <>
          <li className="nav-item mx-2">
            <a className="nav-link btn btn-primary" href={linkToInfo} >Trang cá nhân</a>
          </li>
          <li className='nav-item'>
          <a className="nav-link btn btn-primary text-white px-3 ml-1" style={{ cursor: "pointer" }} onClick={() => {
            if (window.confirm("Xác nhận đăng xuất?")) {
              localStorage.removeItem("UserInfo");
              setIsLogin(false);
              history.push('/')
            }
          }}>Đăng xuất</a>
          </li>
        </>
      )
    } else {
      return (
        <><div className="collapse navbar-collapse" id="navbarNav">
          <li className="nav-item">
            <a className="nav-link" href="/login" >Đăng nhập</a>
          </li>
          <li className="nav-item">
            <a className="nav-link btn btn-primary text-white px-3 ml-1 btn-join" href="/signup" >Đăng ký</a>
          </li>
          </div>
        </>
      )
    }
  };

  const handleNavPosition = () => {
    if (document.documentElement.scrollTop > -100 && document.documentElement.scrollTop < 100) {
      select("#navbar-home")?.classList.add("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.add("color-white"));
      select("#svgId")?.classList.add("svg-white");
    } else if (document.body.scrollTop || document.documentElement.scrollTop >= 100 && document.documentElement.scrollTop < 200) {
      select("#navbar-home")?.classList.remove("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.remove("color-white"));
      select("#svgId")?.classList.remove("svg-white");
      selectALl(".navbar-home>hr").forEach(hr => hr.classList.add("d-none"));
      select(".navbar-search")?.classList.add("d-none");
      selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.add("disabled"));
      select(".nav-bottom")?.classList.add("nav-collapse");
      select(".nav-bottom")?.classList.remove("nav-show");
    } else if (document.body.scrollTop || document.documentElement.scrollTop >= 200) {
      select("#navbar-home")?.classList.remove("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.remove("color-white"));
      select("#svgId")?.classList.remove("svg-white");
      selectALl(".navbar-home>hr").forEach(hr => hr.classList.remove("d-none"));
      select(".navbar-search")?.classList.remove("d-none");
      selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.remove("disabled"));
      select(".nav-bottom")?.classList.remove("nav-collapse");
      select(".nav-bottom")?.classList.add("nav-show");
    }
  }

  if (history.location.pathname == "/") {
    select("#navbar-home")?.classList.add("navbar-home", "navbar-transparent");
    selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.add("color-white"));
    select("#svgId")?.classList.add("svg-white");
    selectALl(".navbar-home>hr").forEach(hr => hr.classList.add("d-none"));
    select(".navbar-search")?.classList.add("d-none");
    selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.add("disabled"));
    select(".nav-bottom")?.classList.add("nav-collapse");
    handleNavPosition();
  }

  window.onscroll = () => {
    if (history.location.pathname == "/") {
      handleNavPosition();
    }
  }

  window.onbeforeunload = () => {
    document.documentElement.scrollTo({ top: 0 });
  };

  const handleForm = () =>{
    if(localStorage.getItem("UserInfo") && JSON.parse(localStorage.getItem("UserInfo")).role === "Customer"){
    return(
      <li className="nav-item">
          <a className="nav-link" href="/be-seller" >Trở thành người bán</a>
      </li>
    )}
  }

  return (
    <div id='navbar-home'>
      <div className='container'>
        <nav className="navbar navbar-expand-lg nav-top">
          <div className='d-flex'>
            <a className="navbar-brand" href="/">
                <img src={logo} alt="logo" />
                <h3 className='font-weight-bold'>DIGITAL ART</h3>
            </a>
            
          </div>
          <div className='d-flex'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/" >Trang chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/shop-art" >Cửa hàng</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={linkToCart} >Giỏ hàng</a>
                </li>
                {handleForm()}
              </ul>
            </div>
            <ul className="navbar-nav mr-auto">
              {handleRenderLoginSpace()}
            </ul>
          </div>
        </nav>
      </div >
      <hr />
    </div>
  )
}