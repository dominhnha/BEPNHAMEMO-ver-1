import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'

import MainRoutes from '../routes/MainRoutes'
import { useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import { CART__SET } from '../reducers/type';

const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));

const Loading = React.lazy(() => import('../components/Loading/Loading'));

const Layout = props => {
  const {Cart,dispatch} = useContext(CartContext);
  // get default cart by local store
  useEffect(()=>{
    const data = JSON.parse( localStorage.getItem("CART"));
    if(data == null){
      dispatch({
        type:CART__SET,
        payload:[]        
      })
    }else{
      dispatch({
        type:CART__SET,
        payload:data        
      })
    }
    
  },[])
  console.log(Cart)
  return (
    <BrowserRouter>
        <Suspense fallback={<Loading/>}>
         <Header/>
            <main>
                <MainRoutes/>
            </main>
        <Footer/>
        </Suspense>     
    
    </BrowserRouter>
  )
}

Layout.propTypes = {}

export default Layout