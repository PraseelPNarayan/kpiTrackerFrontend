import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import moment from 'moment'
import { loginStaff } from '../../js/reducer/kpiTrackerSlice'





export default function ProtectedRoutes({children}) {
const isLoggedIn = useSelector(state => state.kpiTracker.loggedInStaff)
const location = useLocation();

const dispatch= useDispatch()


let token =JSON.parse(localStorage.getItem('token'))
const decoded = jwtDecode(token.token)
const tokenExpired = moment.unix(decoded.exp).format('DD/MM/YYYY hh:mm:ss') < moment().format('DD/MM/YYYY hh:mm:ss')

const logOutUser=()=>{
dispatch(loginStaff({}))
}

useEffect(()=>{
  logOutUser()
},[tokenExpired])


  return token && !tokenExpired && isLoggedIn ? 
  
  children
  
  : <Navigate to="/login" replace state={{from:location}}/> 

  // return  children
  
}
