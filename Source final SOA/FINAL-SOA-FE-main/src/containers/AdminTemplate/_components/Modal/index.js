import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actManageUsers, actResetModal } from "./modules/actions";

export default function AdminModal(props) {
  const { method, userEdit, userId, userStatus } = props;

  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);
  const dispatch = useDispatch();

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
    dispatch(actResetModal());
    if (userEdit) {
      
      setState({
        fullname: userEdit.fullname,
        email: userEdit.email,
        username: userEdit.username,
        phone: userEdit.phone,
        gender: userEdit.gender,
        address: userEdit.address,
        role: userEdit.role,
      });
    } else {
      setState({ ...initialState });
      setValid({...initialValid});
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [userEdit]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const refresh = () => {
    window.location.reload();
  }

  const handleOnSubmit = (e) => {
    const m = method.toLowerCase();
    if (window.confirm(`Bạn có chắc ${m} người dùng này?`)) {
      e.preventDefault();
      dispatch(actManageUsers(state, method, userEdit?.user_id));
      refresh();
    }
  };

  const handleLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return (
      message && (
        <div className="alert alert-danger mt-3 text-center">{message}</div>
      )
    );
  };

  window.onclick = function (e) {
    if (e.target == document.getElementById("addModal")) {
      handleResetForm();
    }
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let {
      fullnameValid,
      emailValid,
      usernameValid,
      passwordValid,
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
      case "password": {
        passwordValid = mess === "" ? true : false;
        let pattern = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        if (value && !value.match(pattern)) {
          passwordValid = false;
          mess = "Your password seems invalid";
        } else {
          passwordValid = true;
        }
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
      fullnameValid & emailValid & usernameValid & passwordValid & phoneValid & addressValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      usernameValid,
      passwordValid,
      phoneValid,
      addressValid,
      errors: { ...valid.errors, [name]: mess },
    });
  };
  return (
    <div className="modal fade" id="addModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{method} người dùng</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleResetForm();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="fullname"
                  placeholder="Họ tên"
                  onChange={handleOnchange}
                  value={state.fullname}
                  onBlur={handleErrors}
                />
                {valid.errors.fullname && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.fullname}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnchange}
                  value={state.email}
                  onBlur={handleErrors}
                />
                {valid.errors.email && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Tài khoản"
                  onChange={handleOnchange}
                  value={state.username}
                  onBlur={handleErrors}
                />
                {valid.errors.username && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.username}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  disabled={userEdit ? true : false}
                  type="password"
                  name="password"
                  autoComplete="on"
                  placeholder={userEdit ? "Mật khẩu" : "Mật khẩu mới"}
                  onChange={handleOnchange}
                  onBlur={handleErrors}
                />
                {valid.errors.password && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  onChange={handleOnchange}
                  value={state.phone}
                  onBlur={handleErrors}
                />
                {valid.errors.phone && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.phone}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  className="custom-select"
                  name="gender"
                  value={state.gender}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                >
                  <option value="Male">
                    Nam
                  </option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="custom-select"
                  name="role"
                  value={state.role}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                >
                  <option value="Customer">Khách hàng</option>
                  <option value="Seller">Người bán</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  onChange={handleOnchange}
                  value={state.address}
                  onBlur={handleErrors}
                />
                {valid.errors.address && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.address}
                  </div>
                )}
              </div>
              <div className="form-group text-center mt-3">
                <button className="btn btn-success px-3" type="submit" disabled={userEdit?false:!valid.formValid} >
                  {method}
                </button>
              </div>
              <div>{handleLoading()}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}