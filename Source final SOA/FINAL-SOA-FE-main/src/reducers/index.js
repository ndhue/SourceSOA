import { combineReducers } from "redux";
import productDetailReducer from "containers/HomeTemplate/DetailProductPage/modules/reducer";
import sellersManagementReducer from "containers/AdminTemplate/SellerManagementPage/modules/reducer";
import userLoginReducer from "containers/AdminTemplate/LoginPage/modules/reducer";
import signUpReducer from "containers/AdminTemplate/SignUpPage/modules/reducer";
import modalReducer from "containers/AdminTemplate/_components/Modal/modules/reducer";
import modalProductReducer from "containers/AdminTemplate/_components/ModalProduct/modules/reducer";
import usersManagementReducer from "containers/AdminTemplate/UsersManagementPage/modules/reducer";
import productsManagementReducer from "containers/HomeTemplate/ShopArtPage/modules/reducer";
import productsManagementReducerByAdmin from "containers/AdminTemplate/ProductsManagementPage/modules/reducer";
import usersInfoManagementReducer from "containers/HomeTemplate/PersonInfoPage/modules/reducer";
import cartManagementReducer from "containers/HomeTemplate/CartPage/modules/reducer";
import paymentReducer from "containers/HomeTemplate/PayPage/modules/reducer";
import ordersManagementReducer from "containers/HomeTemplate/OrderPage/modules/reducer";
import transactionsManagementReducer from "containers/AdminTemplate/CashManagementPage/modules/reducer";
export const rootReducer = combineReducers({
  productDetailReducer,
  sellersManagementReducer,
  userLoginReducer,
  signUpReducer,
  modalReducer,
  modalProductReducer,
  usersManagementReducer,
  productsManagementReducer,
  productsManagementReducerByAdmin,
  usersInfoManagementReducer,
  cartManagementReducer,
  paymentReducer,
  ordersManagementReducer,
  transactionsManagementReducer
});