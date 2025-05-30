import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useUserStore } from "./stores/useUserStore";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import AdminPage from "./pages/AdminPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import Loading from "./components/Loading";
import AdminProductManagementPage from "./pages/AdminProductManagementPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import AdminOrderManagement from "./components/AdminOrderManagement";
import AdminSalesDetailsPage from "./pages/AdminSalesDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer";
import AddToCartPage from "./pages/AddToCartPage";
import OrdersPage from "./pages/OrdersPage";
import RequiredAuth from "./components/RequiredAuth";
import CheckoutPage from "./pages/CheckoutPage";
const App = () => {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={
            user == null ? <Loading name={"Profile Page"} /> : <ProfilePage />
          }
        />
        <Route
          path="/profile/edit"
          element={
            user == null ? (
              <Loading name={"Profile Edit Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <ProfileEditPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            user == null ? (
              <Loading name={"Admin Dashbaord"} />
            ) : user && user?.user?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/add-product"
          element={
            user == null ? (
              <Loading name={"Add Product Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <ProductCreatePage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/product-management"
          element={
            user == null ? (
              <Loading name={"Product Management Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <AdminProductManagementPage user={user} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/users-management"
          element={
            user == null ? (
              <Loading name={"Users Management Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <AdminUserManagementPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/order-management"
          element={
            user == null ? (
              <Loading name={"Orders Management Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <AdminOrderManagement />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/sales-details"
          element={
            user == null ? (
              <Loading name={"Sales Details Page"} />
            ) : user && user?.user?.role === "admin" ? (
              <AdminSalesDetailsPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/products/:category?" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<AddToCartPage />} />
        <Route
          path="/orders"
          element={
            <RequiredAuth user={user} name="Orders">
              <OrdersPage />
            </RequiredAuth>
          }
        />
        <Route path="/order/checkout" element={<CheckoutPage />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default App;
