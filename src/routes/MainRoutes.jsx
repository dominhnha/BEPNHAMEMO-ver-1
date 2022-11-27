import React,{lazy} from 'react'
import PropTypes from 'prop-types'
import {Route, Routes} from 'react-router-dom'
// import Components


const Home = React.lazy(() => import('../pages/Home/Home'))
const Product = React.lazy(() => import('../pages/Product/Product'))
const ProductView = React.lazy(() => import('../pages/ProductView/ProductView'))
const SignIn = React.lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = React.lazy(() => import('../pages/SignUp/SignUp'))
const Cart = React.lazy(() => import('../pages/Cart/Carts'))
const Payment = React.lazy(() => import('../pages/Payment/Payment'))
const Error = React.lazy(() => import('../pages/Error/Error'))
const Search = React.lazy(() => import('../pages/Search/Search'))
const Contact = React.lazy(() => import('../pages/Contact/Contact'))
const Event = React.lazy(() => import('../pages/Event/Event'))




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
        <Route exact path='/Contact' element={<Contact/>}></Route>
        {/* Event */}
        <Route exact path='/Event' element={<Event/>}></Route>
        <Route  path='*' element={<Error/>}></Route>
    </Routes>
  )
}

MainRoutes.propTypes = {}

export default MainRoutes