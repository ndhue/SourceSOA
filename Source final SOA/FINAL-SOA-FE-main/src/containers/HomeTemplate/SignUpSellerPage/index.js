import Loading from "components/Loading";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actResetSignUpMessenger, actSignUp } from "./modules/actions";
import '../../AdminTemplate/SignUpPage/style.css';
import background1 from "./img/banner.jpg";
import background2 from "./img/content.jpg";
export default function SignUpSeller() {
  const userId = localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")).user_id : 0;
  const formInput = useRef(null);
  const history = useHistory();
  const [info, setInfo] = useState({
    name_store: "",
    user_id: userId,
  });

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      name_store: "",
    },
    formValid: false,
    fullnameValid: false,
    emailValid: false,
    storenameValid: false
  };
  const [valid, setValid] = useState({ ...initialValid });

  const handleOnchange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      dispatch(actResetSignUpMessenger());
  }, []);
  
  const handleSubmit = (e) => {
    if(window.confirm('Đăng ký thành công!')){
      e.preventDefault();
      dispatch(actSignUp(info));
      formInput.current.reset();
      history.goBack();
    }
  };

  const dispatch = useDispatch();
  const message = useSelector((state) => state.signUpReducer.message);
  const loading = useSelector((state) => state.signUpReducer.loading);

  const handleLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return message && <div className="alert alert-danger mt-3">{message}</div>;
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let {
      fullnameValid,
      emailValid,
      storenameValid,
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
          mess = "Tên bạn không hợp lệ";
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
          mess = "Email bạn không hợp lệ";
        } else {
          emailValid = true;
        }
        break;
      }
      case "name_store": {
        storenameValid = mess === "" ? true : false;
        break;
      }
      
      default:
        break;
    }
    formValid =
      fullnameValid & emailValid & storenameValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      errors: { ...valid.errors, [name]: mess },
    });
  };
  
  return (
    <div className="form-reg">
      <div className="body-signup" style={{ backgroundImage: `url(${background1})` }}>
        <h1 id="w3ls" className="w3ls">Trở thành người bán hàng</h1>
        <div className="content-w3ls">
          <div className="content-agile1" style={{ backgroundImage: `url(${background2})` }}>
            <h2 className="agileits1">Official</h2>
            
          </div>
        <div className="content-agile2">
          <form onSubmit={handleSubmit} ref={formInput}>
            <div className="w3layouts"> 
              <input type="text" id="fullname" name="fullname" placeholder="Họ và tên" title="Vui lòng nhập họ tên" required
              onBlur={handleErrors}/>
              {valid.errors.fullname && (
              <div className="alert alert-danger mx-4">{valid.errors.fullname}</div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="email" id="email" name="email" placeholder="Email" title="Vui lòng nhập email" required
              onBlur={handleErrors}/>
              {valid.errors.email && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.email}
                </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="text" id="storename" name="name_store" placeholder="Tên cửa hàng" title="vui lòng nhập tên cửa hàng" required 
              onBlur={handleErrors} onChange={handleOnchange}/>
              {valid.errors.storename && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.storename}
                </div>
              )}
            </div>
            <button className="btn btn-sign-up register" type="submit" disabled={!valid.formValid}>
            Đăng kí
          </button>
          </form>
          <div>{handleLoading()}</div>
            
          </div>
        <div className="clear" />
      </div>
    </div>
    </div>
  );
}