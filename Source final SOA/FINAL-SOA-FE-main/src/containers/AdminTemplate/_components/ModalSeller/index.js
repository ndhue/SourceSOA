import Loading from "components/Loading";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actManageSeller, actResetModal} from "./modules/actions";
export default function AdminModalSeller(props) {
  const { method, userEdit, userStatus} = props;
  
  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);

  const dispatch = useDispatch();

  const initialState = {
    user_id: "",
    name_store: "",
    status: "",
  };

  const [state, setState] = useState({ ...initialState });

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    dispatch(actResetModal());
    if (userEdit) {
      setState({
        pending_id: userEdit.pending_id,
        user_id: userEdit.user_id,
        name_store: userEdit.name_store,
        status: userEdit.status
      });
    } else {
      setState({ ...initialState });
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [userEdit]);

  const refresh = () => {
    window.location.reload();
  }

  const handleOnSubmit = (e) => {
    const m = method.toLowerCase();
    if (window.confirm(`Bạn có chắc ${m} đơn?`)) {
    e.preventDefault();
    dispatch(actManageSeller(state.pending_id, method, userStatus));
    }
    refresh();
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
                  name="user_id"
                  placeholder="ID"
                  value={state.user_id}
                  onChange={handleOnchange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="name_store"
                  name="email"
                  placeholder="Tên cửa hàng"
                  value={state.name_store}
                  onChange={handleOnchange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="status"
                  placeholder="Trạng thái"
                  value={state.status}
                  onChange={handleOnchange}
                />
              </div>
              
              <div className="form-group text-center mt-3">
                <button className="btn btn-success px-3" type="submit">
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
