import Loading from "components/Loading";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actManageProducts, actResetModal } from "./modules/actions";

export default function AdminModalProduct(props) {
  const { method, productEdit, userId, productStatus} = props;
  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);
  const dispatch = useDispatch();

  const initialState = {
    product_name: "",
    description: "",
    price: "",
    product_image: "",
    seller_id: userId,
    status: productStatus,
  };
  const fileInput = useRef(null);
  const [state, setState] = useState({ ...initialState });
  const handleResetForm = () => {
    dispatch(actResetModal());
    if (productEdit) {
      setState({
        product_name: productEdit.product_name,
        description: productEdit.description,
        price: productEdit.price,
        product_image: productEdit.product_image,
        status: productStatus
      });
    } else {
      setState({ ...initialState });
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [productEdit]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    const m = method.toLowerCase();
    if (window.confirm(`Bạn có chắc ${m} sản phẩm?`)) {
    e.preventDefault();
    dispatch(actManageProducts(state, method, productEdit?.product_id));
    window.location.reload();
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
    if (e.target === document.getElementById("addModal")) {
      handleResetForm();
    }
  };
  const renderInputFile = () =>{
    if(method === "Thêm"){
      return(
        <div className="form-group">
              <input
                type="file"
                name="product_image"
                ref={fileInput}
                onChange={e => setState({ ...state, [e.target.name]: e.target.files[0] })}/>
              </div>
      )
    }
  } 

  const renderImage = (img) =>{
    if(img)
    return (
      <div className="form-group">
                <img width={"100px"} height={'100%'} object-fit={'contain'} src={`http://localhost:9090/file/`+`img`} />
              </div>
    )
  }

  return (
    <div className="modal fade" id="addModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{method} sản phẩm</h5>
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
                  name="product_name"
                  placeholder="Tên sản phẩm"
                  onChange={handleOnchange}
                  value={state.product_name}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Mô tả"
                  onChange={handleOnchange}
                  value={state.description}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Giá"
                  onChange={handleOnchange}
                  value={state.price}
                />
              </div>
              {renderInputFile()}
              {renderImage(`${state.product_image}`)}
              
              <div className="form-group text-center mt-3">
                <button className="btn btn-success px-3" type="submit" >
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