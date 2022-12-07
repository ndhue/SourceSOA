import React from 'react';
import './style.css'
import logo from './img/logo.png';

export default function FooterHome() {
  return (
    <>
      <hr />
      <footer className='mt-4 mx-2'>
          <div className="footer_widget_list">
            <div className="footer_contact">
              <div className="footer_contact_list">
                <span>Địa chỉ</span>
                <p>18 Nguyễn Hữu Thọ, Q7, HCM</p>
              </div>
              <div className="footer_contact_list">
                <span>24/7 hotline:</span>
                <a href="tel:(+84) 099123456">(+84) 099123456</a>
              </div>
            </div>
        </div>

        <hr />
        <div className='container-fluid d-flex justify-content-between align-items-center my-2'>
          <div className='d-flex align-items-center'>
            <img src={logo} alt='logo' />
          </div>
          <div className='d-flex align-items-center'>
            <div className='footer-icon'>
             
              <i className="fa fa-facebook"></i>
             
              <i className="fa fa-pinterest"></i>
              <i className="fa fa-instagram"></i>
            </div>
          
          </div>
        </div>
      </footer>
    </>
  )
}