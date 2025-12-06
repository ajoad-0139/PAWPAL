import React from 'react'
import { Navigate } from 'react-router-dom';

const checkAuth = ({children}) => {
  const isUserExist = localStorage.getItem('user');
  if(!isUserExist) return <Navigate to={'/auth/login'}/>
  return (
    children
  )
}

export default checkAuth