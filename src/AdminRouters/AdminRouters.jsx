import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Components/Admin'
import PrivateRoute from '../PrivateRoute/PrivateRoute'


// import AdminLogin from '../user/components/Form/AdminLogin'

const AdminRouters = () => {
  console.log("jihughcf")
  
  return <PrivateRoute component={Admin} />;
  
}

export default AdminRouters