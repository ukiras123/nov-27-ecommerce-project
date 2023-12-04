import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ForgetPassword from './pages/auth/ForgetPassword';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Category from './pages/category/Category';
import Product from './pages/product/Product';
import PaymentOptions from './pages/payment-options/PaymentOptions';
import Orders from './pages/orders/Orders';
import Customers from './pages/customers/Customers';
import Profile from './pages/profile/Profile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserInfo } from './redux/auth/userAction';
import { auth } from './firebase-config';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import AddNewProduct from './pages/product/AddNewProduct';
import EditNewProduct from './pages/product/EditNewProduct';
import { getAllCategoriesAction } from './redux/category/categoryAction';
import { getAllProductAction } from './redux/product/productAction';

function App() {


  const dispatch = useDispatch();
  // This will always make sure our store is hydrated with user info 
  // although a user refreshes the page
  onAuthStateChanged(auth, (user) => {
    if (user?.uid) {
      dispatch(getUserInfo(user.uid))
    }
  })

  // Default Fetch
  useEffect(() => {
    dispatch(getAllCategoriesAction())
    dispatch(getAllProductAction())
  }, [dispatch])
  return (
    <div className="app">
      {/* Routes */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>


        {/* Private */}
        {/* Anyone who is not logged in, can not come to these pages */}
        {/* We will make it private once we have one admin created */}
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}>
        </Route>
        <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>}></Route>

        <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>}></Route>
        <Route path="/product/new" element={<PrivateRoute><AddNewProduct /></PrivateRoute>}></Route>
        <Route path="/product/edit/:slug" element={<PrivateRoute><EditNewProduct /></PrivateRoute>}></Route>



        <Route path="/payment-options" element={<PrivateRoute><PaymentOptions /></PrivateRoute>}></Route>
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>}></Route>
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>}></Route>
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path="*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}>
        </Route>
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
