import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import HomePage from '../user/pages/HomePage';
import LoginPage from '../user/pages/LoginPage';
import SignUpPage from '../user/pages/SignUpPage';
import ProductPage from '../user/pages/ProductPage';
import AboutUsPage from '../user/pages/AboutUsPage';
import ContactUsPage from '../user/pages/ContactUsPage';
import ProductDetails from '../user/components/ProductDetails/ProductDetails';
import CartPage from '../user/pages/CartPage';
import CheckOut from '../user/components/CheckOut.jsx/CheckOut';
import Footer from '../user/components/Footer/Footer';
import OrderDetails from '../user/components/Order/OrderDetails';
import PaymentSuccess from '../user/components/Payment/PaymentSuccess';
import Navbar from '../user/components/Navbar/Navigation';
import MyOrdersPage from '../user/pages/MyOrdersPage';
import RateAndReview from '../user/components/RateAndReview/RateAndReview';
import DeptAndSearch from '../user/components/DepartmentAndSearch/DeptAndSearch';
import Gallery from '../user/components/Gallery/Gallery';
import ForgotPassword from '../user/components/ForgotPassword/ForgotPassword';
import OTPVerification from '../user/components/ForgotPassword/OTPVerification';
import ResetPassword from '../user/components/ForgotPassword/ResetPassword';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from './logo.png';
import UnAuthorizedPage from './UnAuthorizedPage';
import Profile from '../user/components/Profile/Profile';
import PrivacyPolicy from '../user/components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../user/components/PrivacyPolicy/TermsAndCondition';
import ShippingPolicy from '../user/components/PrivacyPolicy/ShippingPolicy';
import ReturnAndRefund from '../user/components/PrivacyPolicy/ReturnAndRefund';

const CustomerRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  // Check if JWT token is present
  const isJWTPresent = () => {
   
    return localStorage.getItem('jwt') !== null;
    
  };

  return (
    <div className="">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/search" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUsPage />}></Route>
        <Route path="/contact-us" element={<ContactUsPage />}></Route>
        <Route path="/products/id/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={isJWTPresent() ? <CartPage /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/checkout" element={isJWTPresent() ? <CheckOut /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/account/order" element={isJWTPresent() ? <MyOrdersPage /> : <Navigate to="/unauthorized" />}></Route>
       
        <Route path="/account/order/:orderId" element={isJWTPresent() ? <OrderDetails /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/payment/:orderId" element={isJWTPresent() ? <PaymentSuccess /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/account/rate/:productId" element={isJWTPresent() ? <RateAndReview /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/account/profile" element={isJWTPresent() ? <Profile /> : <Navigate to="/unauthorized" />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/terms&conditions" element={<TermsAndConditions/>}></Route>
        <Route path="/shipping-policy" element={<ShippingPolicy/>}></Route>
        <Route path="/return&refund" element={<ReturnAndRefund/>}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/otpVerification/email/:emailId" element={<OTPVerification />}></Route>
        <Route path="/resetPassword/email/:emailId" element={<ResetPassword />}></Route>
        <Route path="/unauthorized" element={<UnAuthorizedPage />}></Route>
      </Routes>
      <FloatingWhatsApp
        phoneNumber="7863884525"
        accountName="Resin Gift Store"
        avatar={"https://res.cloudinary.com/dkhsnhjrh/image/upload/c_crop,w_250,h_250,ar_1:1/v1708707454/2_cemsmx.png"}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
      <Footer />
    </div>
  );
};

export default CustomerRoutes;