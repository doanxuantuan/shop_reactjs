import React from 'react'
import './Admin.css'
import Sidebar from '../../Component/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import ListProduct from '../../Component/ListProduct/ListProduct'
import AddProduct from '../../Component/AddProduc/AddProduct'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin