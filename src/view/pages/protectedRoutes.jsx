import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation,Route } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import moment from 'moment'
import { loginStaff } from '../../js/reducer/kpiTrackerSlice'
import { useAuth } from '../../js/auth/authProvider'
import { trim } from 'validator'

 const ProtectedRoutes =({element,roles}) => {
const userProfile = useSelector(state => state.kpiTracker.loggedInStaff)
const location = useLocation();

const dispatch= useDispatch()


let token =JSON.parse(localStorage.getItem('token'))
let decoded =token && token.token ?  jwtDecode(token.token) : null
let tokenExpired = null
if(decoded)
{
  tokenExpired = moment.unix(decoded.exp).format('DD/MM/YYYY hh:mm:ss') < moment().format('DD/MM/YYYY hh:mm:ss')

}


const logOutUser=()=>{
dispatch(loginStaff({}))
}

useEffect(()=>{
  if(tokenExpired)
  {

    logOutUser()
  }
},[tokenExpired])

console.log(
  token, !tokenExpired,token.isLoggedIn,roles.includes(token.role)
)
// const userHasRequiredRole = user && roles.includes(user.userParsed.role) ? true : false;
  return token && !tokenExpired && token.isLoggedIn && roles.includes(token.role)? 
  
  element
  
  : <Navigate to="/login" replace state={{from:location}}/> 

//   if (user.userParsed.isLoggedIn && !userHasRequiredRole) {
//     return (<h1> You are not authorised</h1>); // build your won access denied page (sth like 404)
//   }
// return children
  // return  children
  
}

export default ProtectedRoutes