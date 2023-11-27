import React from 'react';
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

function App() {
  return (
    <div className="app">
      {/* Routes */}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        {/* We will make it private once we have one admin created */}
        <Route path="/register" element={<Register />}></Route>

        {/* Private */}
        {/* Anyone who is not logged in, can not come to these pages */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/payment-options" element={<PaymentOptions />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/profile" element={<Profile />}></Route>

      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
