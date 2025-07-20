import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
function PrivateRoute() {
    const { user } = useSelector(state => state.user)
  return user? <Outlet/> : <Navigate to={"/"}  />
}

export default PrivateRoute