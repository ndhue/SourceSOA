import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminModalProduct from '../_components/ModalProduct'
import { removeVietnameseTones } from '../_components/Modal/validation';
import { actDeleteProduct, actFetchProductsData } from './modules/actions';
import './style.css';
import VND from 'components/CurrencyFormat';
export default function ProductsManagementPage() {
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");
  const [productEdit, setProductEdit] = useState(null);
  const [productStatus, setProductStatus] = useState(null);
  const data = useSelector(state => state.productsManagementReducerByAdmin.data);
  const [productsData, setProductsData] = useState(null);

  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    dispatch(actFetchProductsData());
  }, []);

  useEffect(() => {
    setProductsData(data);
  }, [data]);

  const handleDeleteProduct = id => {
    if (window.confirm("Bạn muốn xóa sản phẩm?")) {
      dispatch(actDeleteProduct(id));
      window.location.reload();
    }
  }

  const checkStatus = (status, product) =>{
    if(status === "Chờ duyệt")
      return (
        <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
          setMethod("Duyệt");
          setProductEdit(product);
          setProductStatus("Còn hàng")
        }}>Chờ duyệt</button>
      )
    else if(status === "Còn hàng"){ 
      return(
      <button className='btn btn-success' disabled>
          Đã duyệt
        </button>
    )}
    else if(status === "Hết hàng"){ 
      return(
      <button className='btn btn-success' disabled>
          Hết hàng
        </button>
    )}
  }

  const handleRenderTable = () => {
    return productsData?.map((product, index) => {
      return (
        <tr key={product.product_id}>
          <th scope="row">{index + 1}</th>
          <td className='product-name'>{product.product_name}</td>
          <td><div className='product-cover'>
            <img className="product-image" src={`http://localhost:9090/file/`+`${product.product_image}`} alt='for sale' /></div>
          </td>
          <td>{VND.format(product.price)}</td>
          <td>{checkStatus(`${product.status}`,product)}</td>
          <td>
            <button className='btn btn-edit mx-1' data-toggle="modal" data-target="#addModal" onClick={() => {
              setMethod("Chỉnh sửa");
              setProductEdit(product);
              setProductStatus("Chờ duyệt")
            }}>Chỉnh sửa</button>
            <button className='btn btn-del mx-1' onClick={() => { handleDeleteProduct(product.product_id) }
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
        searchingData = data.filter(product => {
          if (product.product_name) {
            return removeVietnameseTones(product.product_name.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setProductsData(searchingData);
      }
      case "status": {
        searchingData = data.filter(product => {
          if (product.status) {
            return removeVietnameseTones(product.status.toLowerCase()).indexOf(keyword) >= 0
          }
        });
        return setProductsData(searchingData);
      }
      default: {
        return setProductsData(data);
      }
    }
  }

  return (
    <div>
      <h5 className='text-center my-3 user-title'>QUẢN LÝ SẢN PHẨM</h5>
      <div className='d-flex justify-content-between mx-5'>
        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchType)
        }}>
          <div className="form-group">
            <select className="form-control" onChange={(e) => { setSearchType(e.target.value) }}>
              <option>Tất cả</option>
              <option value="name">Theo tên</option>
              <option value="status">Theo trạng thái</option>
            </select>
          </div>
          <input className="form-control m-0 mx-2" type="search" placeholder="Tìm kiếm" aria-label="Search" ref={searchInput} />
          <button className="btn m-0 btn-search" type="submit">Tìm kiếm</button>
        </form>
        <button className="btn btn-primary" onClick={()=>{
          const searchingData = productsData.filter(product => {
            if (product.status) {
              return removeVietnameseTones(product.status.toLowerCase()).indexOf(removeVietnameseTones("Chờ duyệt").toLowerCase()) >= 0
            }
          });
          return setProductsData(searchingData);
        }}> Duyệt sản phẩm</button>
      </div>
      <AdminModalProduct method={method} productEdit={productEdit} productStatus={productStatus}/>

      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Giá</th>
            <th scope="col">Trạng thái</th>
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