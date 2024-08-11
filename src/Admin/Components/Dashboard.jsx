import React from 'react'
import Achivement from '../Tables/Achivement'
import MonthlyOverview from '../Tables/MonthlyOverView'
import ProductsTable from './ProductsTable'
import CreateProductForm from './CreateProductForm'
import { useNavigate } from 'react-router-dom'
// import WeeklyOverview from '../Tables/WeeklyOverview'

const Dashboard = () => {
  const navigate = useNavigate()
  const handleContact = () => {
    navigate('/admin/contact')
  }
  return (
    <>
    <div className=' flex justify-center bg-primarycolor'>
      <button onClick={handleContact}>Contact</button>
    </div>
     <Achivement/>
     {/* <WeeklyOverview/> */}
    <MonthlyOverview/>
    <ProductsTable/>
    
    </>
   
  )
}

export default Dashboard