import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeVietnameseTones } from '../_components/Modal/validation';
import AdminModalSeller from '../_components/ModalSeller';
import { actFetchUsersData } from './modules/actions';
import './style.css';
export default function SellerManagementPage() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");
  const [userEdit, setUserEdit] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const data = useSelector(state => state.sellersManagementReducer.data);
  const [usersData, setUsersData] = useState(null);
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    dispatch(actFetchUsersData());
  }, []);

  useEffect(() => {
    setUsersData(data);
  }, [data]);

  const checkStatus = (status, user) =>{
    if(status === "Chờ duyệt")
      return (
        <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("Duyệt");
          setUserEdit(user);
          setUserStatus("Đã duyệt")
        }}>Chờ duyệt</button>
      )
    else if(status === "Không duyệt"){ 
      return(
      <button className='btn btn-success' disabled>
          Không duyệt
        </button>
    )}
    else if(status === "Đã duyệt"){ 
      return(
      <button className='btn btn-success' disabled>
          Đã duyệt
        </button>
    )}
  }

  console.log(usersData);
  const handleRenderTable = () => {
    return usersData?.map((user, index) => {
      return (
        <tr key={user.pending_id}>
          <td scope="row">{index + 1}</td>
          <td>{user.user_id}</td>
          <td>{user.name_store}</td>
          <td>
          {checkStatus(`${user.status}`,user)}
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
      default: {
        return setUsersData(data);
      }
    }
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>QUẢN LÝ NGƯỜI BÁN</h5>
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
            </select>
          </div>
          <input className="form-control m-0 mx-2" type="search" placeholder="Tìm kiếm" aria-label="Search" ref={searchInput} />
          <button className="btn m-0 btn-search" type="submit">Tìm kiếm</button>
        </form>
        <button className="btn btn-primary" onClick={()=>{
          const searchingData = usersData.filter(user => {
            if (user.status) {
              return removeVietnameseTones(user.status.toLowerCase()).indexOf(removeVietnameseTones("Chờ duyệt").toLowerCase()) >= 0
            }
          });
          return setUsersData(searchingData);
        }}> Duyệt đơn</button>
      </div>
      <AdminModalSeller method={method} userEdit={userEdit} userStatus={userStatus}/>

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User ID</th>
            <th scope="col">Tên cửa hàng</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {handleRenderTable()}
        </tbody>
      </table>
    </div>
  )
}
