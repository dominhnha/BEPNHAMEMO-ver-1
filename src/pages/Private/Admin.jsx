import React from 'react'
import PropTypes from 'prop-types'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router'

const Admin = props => {
  return (
    <div>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

Admin.propTypes = {}

export default Admin