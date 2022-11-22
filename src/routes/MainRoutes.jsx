import React from 'react'
import PropTypes from 'prop-types'
import {Route, Routes} from 'react-router-dom'
// import Components
import Home from '../pages/Home/Home'
import Product from '../pages/Product/Product'
import ProductView from '../pages/ProductView/ProductView'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import Cart from '../pages/Cart/Carts'
import Payment from '../pages/Payment/Payment'
import Error from '../pages/Error/Error'
import Search from '../pages/Search/Search'

const MainRoutes = props => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>} />
        {/* product */}
        <Route exact path='/Product'>
          <Route exact index element={<Product/>}></Route>
          <Route exact path=':slug' element={<ProductView/>}></Route>
          <Route exact path='Search' element={<Search/>}></Route>
          <Route exact path='Payment' element={<Payment/>}></Route>
        </Route>

        {/* Account */}
        <Route exact path='/Account'>
          <Route exact path='SignIn' element={<SignIn/>}></Route>
          <Route exact path='SignUp' element={<SignUp/>}></Route>
          <Route exact path='Cart' element={<Cart/>}></Route>
          
        </Route>
        {/*  */}
        <Route  path='*' element={<Error/>}></Route>
    </Routes>
  )
}

MainRoutes.propTypes = {}

export default MainRoutes