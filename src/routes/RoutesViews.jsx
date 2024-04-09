import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import Error404 from '../pages/Error404'
const RoutesViews = () => {
  return (
    <Routes>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<Error404/>}/>
    </Routes>
  )
}

export default RoutesViews