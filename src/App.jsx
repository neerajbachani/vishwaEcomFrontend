import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { useState,useEffect } from 'react'


import AdminRouters from './AdminRouters/AdminRouters'
import CustomerRoutes from './AdminRouters/CustomerRoutes'
import AdminLogin from './user/components/Form/AdminLogin'
// import  PrivateRoute  from './PrivateRoute/PrivateRoute'



function App() {
 

  
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }, [pathname]);

  return (
  
      
        <Routes>
          {/* Pass handleAdminLogin function as a prop to AdminLogin component */}
          <Route path="/admin/login" element={<AdminLogin />} />
        
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path='/admin/*' element={<AdminRouters/>}></Route>
        

          
      </Routes>
   
    
      
  );
}

export default App;


