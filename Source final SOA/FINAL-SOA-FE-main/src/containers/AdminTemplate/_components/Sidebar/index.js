import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './style.css';

export default function AdminSidebar() {
  const history = useHistory();
  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("UserInfo");
      history.push("/");
    }
  }

  return (
    <div className="sidebar">
      <h5 className='text-center pt-3 dashboard'>Bảng điều khiển</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/">Trang chủ</a>
        </li>
        <div className='my-4'>
          <li className="nav-item">
            <a activeclassname='sidebar-active' className="nav-link" href="/users-management">Quản lý người dùng</a>
          </li>
          <li className="nav-item">
            <a activeclassname='sidebar-active' className="nav-link" href="/products-management">Quản lý sản phẩm</a>
          </li>
          <li className="nav-item">
            <a activeclassname='sidebar-active' className="nav-link" href="/seller-management">Quản lý người bán</a>
          </li>
          <li className="nav-item">
            <a activeclassname='sidebar-active' className="nav-link" href="/cash-management">Quản lý nguồn tiền</a>
          </li>
        </div>
        <button className="btn btn-log-out" onClick={handleLogout}>Đăng xuất</button>
      </ul>
    </div>
  )
}