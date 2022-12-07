import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminModal from '../_components/Modal'
import { removeVietnameseTones } from '../_components/Modal/validation';
import { actDeleteUser, actFetchUsersData } from './modules/actions';
import './style.css';
export default function UsersManagementPage() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");
  const [userEdit, setUserEdit] = useState(null);

  const data = useSelector(state => state.usersManagementReducer.data);
  const [usersData, setUsersData] = useState(null);

  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    dispatch(actFetchUsersData());
  }, []);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  const handleDeleteUser = id => {
    if (window.confirm("Bạn muốn xóa người dùng này?")) {
      dispatch(actDeleteUser(id));
      window.location.reload();
    }
  }
  
  const handleRenderTable = () => {
    return usersData?.map((user, index) => {
      return (
        <tr key={user.user_id}>
          <th scope="row">{index + 1}</th>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
              setMethod("Chỉnh sửa");
              setUserEdit(user)
            }}>Chỉnh sửa</button>
            <button className='btn btn-del mx-1' onClick={() => { handleDeleteUser(user.user_id) }
            }>×</button>
          </td>
        </tr>
      )
    })
  }
  const handleSearch = () => {
    let searchingData = [];
    const keyword = removeVietnameseTones(searchInput.current.value).toLowerCase();
    switch (searchType) {
      case "name": {
        searchingData = data.filter(user => {
          if (user.name) {
            return removeVietnameseTones(user.name.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setUsersData(searchingData);
      }
      case "email": {
        searchingData = data.filter(user => {
          if (user.email) {
            return removeVietnameseTones(user.email.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setUsersData(searchingData);
      }
      case "role": {
        searchingData = data.filter(user => {
          if (user.role) {
            return removeVietnameseTones(user.role.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setUsersData(searchingData);
      }
      default: {
        return setUsersData(data);
      }
    }
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>QUẢN LÝ NGƯỜI DÙNG</h5>
      <div className='d-flex justify-content-between mx-5'>
        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchType)
        }}>
          <div className="form-group">
            <select className="form-control" onChange={(e) => { setSearchType(e.target.value) }}>
              <option>Tất cả</option>
              <option value="name">Theo Tên</option>
              <option value="email">Theo Email</option>
              <option value="role">Theo Role</option>
            </select>
          </div>
          <input className="form-control m-0 mx-2" type="search" placeholder="Tìm kiếm" aria-label="Search" ref={searchInput} />
          <button className="btn m-0 btn-search" type="submit">Tìm kiếm</button>
        </form>
        <button className="btn btn-add-user" data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("Thêm");
          setUserEdit(null)
        }}> + Thêm người dùng</button>
      </div>
      <AdminModal method={method} userEdit={userEdit} />

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}
