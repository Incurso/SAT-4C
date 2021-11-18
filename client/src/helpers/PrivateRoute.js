import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../features/NavBar'
import jwtDecode from 'jwt-decode'

// Check if token and clear if it is expired
const tokenExpired = () => {
  const token = window.localStorage.getItem('token') || null

  if (token) {
    const decodedToken = jwtDecode(token)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      window.localStorage.removeItem('token')

      return null
    }
  }

  return token
}


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => tokenExpired()
      ? (
        <>
          <NavBar />
          <Component {...props} />
        </>
        )
      : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
)
