import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminTemplate from "containers/AdminTemplate";
import HomeTemplate from "containers/HomeTemplate";

const routesHome = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("containers/HomeTemplate/HomePage"))
  },
  {
    exact: true,
    path: "/shop-art",
    component: lazy(() => import("containers/HomeTemplate/ShopArtPage"))
  },
  {
    exact: true,
    path: "/cart/:id",
    component: lazy(() => import("containers/HomeTemplate/CartPage"))
  },
  {
    exact: true,
    path: "/detail/:id",
    component: lazy(() => import("containers/HomeTemplate/DetailProductPage"))
  },
  {
    exact: true,
    path: "/user-info/:id",
    component: lazy(() => import("containers/HomeTemplate/PersonInfoPage"))
  },
  {
    exact: true,
    path: "/pay/:id",
    component: lazy(() => import("containers/HomeTemplate/PayPage"))
  },
  {
    exact: true,
    path: "/infopay/:id",
    component: lazy(() => import("containers/HomeTemplate/InfoDigitalPay"))
  },
  {
    exact: true,
    path: "/be-seller",
    component: lazy(() => import("containers/HomeTemplate/SignUpSellerPage"))
  },
  {
    exact: true,
    path: "/order/:id",
    component: lazy(() => import("containers/HomeTemplate/OrderPage"))
  },
  {
    exact: true,
    path: "/detail-order/:id",
    component: lazy(() => import("containers/HomeTemplate/DetailOrderPage"))
  },
];

const routesUser = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("containers/AdminTemplate/LoginPage"))
  },
  {
    exact: true,
    path: "/signup",
    component: lazy(() => import("containers/AdminTemplate/SignUpPage"))
  },
];

const routesAdmin = [
  {
    exact: true,
    path: "/users-management",
    component: lazy(() => import("containers/AdminTemplate/UsersManagementPage"))
  },
  {
    exact: true,
    path: "/products-management",
    component: lazy(() => import("containers/AdminTemplate/ProductsManagementPage"))
  },
  {
    exact: true,
    path: "/seller-management",
    component: lazy(() => import("containers/AdminTemplate/SellerManagementPage"))
  },
  {
    exact: true,
    path: "/cash-management",
    component: lazy(() => import("containers/AdminTemplate/CashManagementPage"))
  },
];

const renderRoutesHome = () => {
  return routesHome.map((route, index) => {
    return <HomeTemplate
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};
const renderRoutesUser = () => {
  return routesUser.map((route, index) => {
    return <Route
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};
const renderRoutesAdmin = () => {
  return routesAdmin.map((route, index) => {
    return <AdminTemplate
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  })
};

export { renderRoutesHome, renderRoutesUser, renderRoutesAdmin }