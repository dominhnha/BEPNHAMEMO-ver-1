import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'

import MainRoutes from '../routes/MainRoutes'

const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));

const Loading = React.lazy(() => import('../components/Loading/Loading'));

const Layout = props => {
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