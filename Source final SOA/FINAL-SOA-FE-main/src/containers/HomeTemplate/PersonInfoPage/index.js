import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchUsersDataByID, actEditUsersDataByID } from './modules/actions';
import { actFetchProductsData, actDeleteProduct } from 'containers/AdminTemplate/ProductsManagementPage/modules/actions'; 
import { actFetchBalanceData } from '../PayPage/modules/actions';
import AdminModalProduct from 'containers/AdminTemplate/_components/ModalProduct';
import './style.css';
import noAvatar from './img/no-avatar.jpg';
import wallet from './img/wallet.jpg'
import VND from 'components/CurrencyFormat';
export default function PersonInfoPage(props) {
  
  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const link = `/order/${userId}`;
  const linkToWallet = `/infopay/${userId}`;
  const data = useSelector(state => state.usersInfoManagementReducer.data);

  const pData = useSelector(state => state.productsManagementReducer.data);
  const [productsData, setProductsData] = useState(null);
  const [userInfo, setUserInfo] = useState('');
  const [method, setMethod] = useState("");
  const [productEdit, setProductEdit] = useState(null);
  const [productStatus, setProductStatus] = useState(null);

  const balanceData = useSelector(state => state.paymentReducer.balance);
  const [balance, setBalanceData] = useState(null);

  useEffect(() => {
    dispatch(actFetchUsersDataByID(userId));
    dispatch(actFetchProductsData());
    dispatch(actFetchBalanceData(userId));
  }, []);

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  useEffect(() => {
    setProductsData(pData);
  }, [pData]);

  useEffect(() => {
    setBalanceData(balanceData);
  }, [balanceData]);

  const initialState = {
    fullname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
    role: "",
  };

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      gender: "",
      address: "",
      role: "",
    },
    formValid: false,
    fullnameValid: false,
    emailValid: false,
    usernameValid: false,
    passwordValid: false,
    phoneValid: false,
    address: false,
  };
  const [valid, setValid] = useState({ ...initialValid });
  const [state, setState] = useState({ ...initialState });

  const handleResetForm = () => {
    if (userInfo) {
      
      setState({
        fullname: userInfo.fullname,
        email: userInfo.email,
        username: userInfo.username,
        phone: userInfo.phone,
        gender: userInfo.gender,
        address: userInfo.address,
        role: userInfo.role,
      });
    } else {
      setState({ ...initialState });
      setValid({...initialValid});
    }
  };

  const handleDeleteProduct = id => {
    if (window.confirm("Bạn muốn xóa sản phẩm?")) {
      dispatch(actDeleteProduct(id));
      refresh();
    }
  }

  useEffect(() => {
    handleResetForm();
  }, [userInfo]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(actEditUsersDataByID(state, method, userId));
    alert('Cập nhật thành công');
    refresh();
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let {
      fullnameValid,
      emailValid,
      usernameValid,
      phoneValid,
      addressValid,
      formValid,
    } = valid;
    switch (name) {
      case "fullname": {
        fullnameValid = mess === "" ? true : false;
        let pattern =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        if (value && !value.match(pattern)) {
          fullnameValid = false;
          mess = "Your name seems invalid";
        } else {
          fullnameValid = true;
        }
        break;
      }
      case "email": {
        emailValid = mess === "" ? true : false;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value && !value.match(pattern)) {
          emailValid = false;
          mess = "Your email seems invalid";
        } else {
          emailValid = true;
        }
        break;
      }
      case "username": {
        usernameValid = mess === "" ? true : false;
        break;
      }
      case "phone": {
        phoneValid = mess === "" ? true : false;
        let pattern =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (value && !value.match(pattern)) {
          phoneValid = false;
          mess = "Your phone seems invalid";
        } else {
          phoneValid = true;
        }
        break;
      }
      case "address": {
        addressValid = mess === "" ? true : false;
        break;
      }
      default:
        break;
    }
    formValid =
      fullnameValid & emailValid & usernameValid & phoneValid & addressValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      usernameValid,
      phoneValid,
      addressValid,
      errors: { ...valid.errors, [name]: mess },
    });
  };

  const checkStatus = (status) =>{
    if(status === "Chờ duyệt")
      return (
        <button className="status btn btn-check" disabled>Chờ duyệt</button>
      )
    return (
      <button className="status btn btn-checked" disabled>Đã duyệt</button>
    )
  }

  const productFilter = (id) => {
    return productsData?.filter(product => product.seller_id === parseInt(id));
  }
  const handleRenderProduct = (id) => {
    return productFilter(id)?.map((product) => {
      return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-6 " key={product.product_id}>
            <div className="single_product py-3">
              <div className="product_thumb">
                <a href={`/detail/`+`${product.product_id}`}>
                  <img className="primary_img" src={`http://localhost:9090/file/`+`${product.product_image}`} alt="consectetur" />
                </a>
              </div>
              <div className="product_content grid_content text-center">
                <h4 className="product_name"><a href={`/detail/`+`${product.product_id}`}>{product.product_name}</a></h4>
                {checkStatus(product.status)}
                <div>
                <button className='btn btn-edit btn-primary' data-toggle="modal" data-target="#addModal" onClick={() => {
                setMethod("Chỉnh sửa");
                setProductEdit(product)
                }}>Chỉnh sửa</button>
              <button className='btn btn-del' onClick={() => { handleDeleteProduct(product.product_id) }
              }>×</button>
                </div>
              </div>
            </div>
        </div>  
      )
    })
  }

  const renderComponent = (role, id) =>{
    if(role === "Seller")
      return (
        <div>
        <div className='row'>
          <h6 className="col-8 heading-small text-muted mb-4">Tranh của tôi</h6>
          <div className='col-4 text-right'>
          <button className="btn bbtn-primary" data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("Thêm");
          setProductEdit(null);
          setProductStatus(null)
        }}> + Thêm sản phẩm</button>
        <AdminModalProduct method={method} productEdit={productEdit} userId={userId} productStatus={productStatus}/>
          </div>
        </div>
        <div className="pl-lg-4">
          <div className="row">
            {handleRenderProduct(id)}
          </div>
        </div>
        </div>
      )
  }
  const refresh = () => {
    window.location.reload();
  }
  
  if(userInfo){
  return (
    <div>
      <div className='user-profile'>
        <div className="main-content">
          {/* Top navbar */}
          <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
            <div className="container-fluid">
              {/* Brand */}
              <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="" target="_blank">Thông tin cá nhân</a>
              {/* User */}
              <ul className="navbar-nav align-items-center d-none d-md-flex">
                <li className="nav-item dropdown">
                  <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img src={noAvatar} />
                      </span>
                      <div className="media-body ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm  font-weight-bold">{state.fullname}</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* Header */}
          <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: 600, backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h1 className="display-2 text-white">Xin chào {state.fullname}</h1>
                  <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                  <button className="btn btn-info" onClick={() => {
                      setMethod("EDIT");}}>Chỉnh sửa hồ sơ</button>
                  <button className="btn btn-info"><a href={link}>Lịch sử giao dịch</a></button>
                </div>
              </div>
            </div>
          </div>
          {/* Page content */}
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a href="#">
                          <img src={noAvatar} className="rounded-circle" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">Kết nối</a>
                      <a href="#" className="btn btn-sm btn-default float-right">Tin nhắn</a>
                    </div>
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Bạn bè</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Hình ảnh</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Bình luận</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>{state.fullname}</h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />{state.address}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card cash-profile shadow mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="cash-profile-image">
                          <img src={wallet} className="rounded-circle" />
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="text-center">
                      <h3>DigitalPay</h3>
                      <div className="font-weight-300 py-1">
                        Số dư:{VND.format(balance)} 
                      </div>
                      <a className='btn btn-primary' href={linkToWallet}>Thông tin ví</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Tài khoản của tôi</h3>
                      </div>
                      <div className="col-4 text-right">
                        <a href="#!" className="btn btn-sm btn-primary">Cài đặt</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleOnSubmit}>
                      <h6 className="heading-small text-muted mb-4">Thông tin cá nhân</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-username">Tài khoản</label>
                              <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" name="username"
                              value={state.username ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.username && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.username}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Email</label>
                              <input type="email" id="input-email" className="form-control form-control-alternative" name="email" value={state.email ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.email && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-first-name">Họ tên</label>
                              <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" name="fullname" value={state.fullname ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.fullname && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.fullname}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-last-name">Vai trò</label>
                              <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" name="role" value={state.role ?? ''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">Thông tin liên hệ</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-address">Địa chỉ</label>
                              <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" type="text" name="address" value={state.address ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.address && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.address}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-address">Số điện thoại</label>
                              <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" type="text" name="phone" value={state.phone ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.phone && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* Order History */}
                      <div className="container">
                        <button className='btn btn-success' disabled={method==='EDIT'?false:true}>Lưu</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div>
                </div>
                <hr/>
                    <hr className="my-4"/>
                    {renderComponent(state.role, userId)}
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
