import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actLogin, actLoginReset } from './modules/actions';
import { Redirect } from 'react-router-dom';
import './style.css';
import background1 from "./img/banner.jpg";

export default function LoginPage(props) {
  const [info, setInfo] = useState({
    username: "",
    password: ""
  });

  const loading = useSelector(state => state.userLoginReducer.loading);
  const error = useSelector(state => state.userLoginReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actLoginReset());
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(actLogin(info.username, info.password, props.history));
  };

  const handleOnChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const notifications = () => {
    if (loading) {
      return <Loading />
    }
    return error && <div className='alert alert-danger mx-4'>{error}</div>
  }

  if (localStorage.getItem("UserInfo")) {
    return <Redirect to="/"></Redirect>
  }
  return (
    <div className="body-login container-fluid" style={{ backgroundImage: `url(${background1})` }}>
      <div className="main-container">
        <div className="header-w3l">
          <h1>Digital Art</h1>
        </div>
        <div className="main-content-agile">
          <div className="w3ls-pro">
            <h2>Đăng nhập</h2>
          </div>
          <div className="sub-main-w3ls">	
            <form onSubmit={handleSubmit}>
              <input placeholder="Nhập tài khoản" name="username" type="text" required onChange={handleOnChange} />
              <input placeholder="Nhập mật khẩu" name="password" type="password" required onChange={handleOnChange}/>
              <div className="checkbox-w3">
                <div className='text-center mt-3'>
                  <a href="/signup" className='p-3'>Đăng ký</a>
                  <a href="/" className='p-3'>Quay lại trang chủ</a>
                </div>
                <div className="clear" />
              </div>
              <input className='login' type="submit" value="Đăng nhập"/>
            </form>
          </div>
          {notifications()}
        </div>
      </div>
    </div>
  )
}