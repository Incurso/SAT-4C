import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../features/NavBar'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => localStorage.getItem('token')
      ? (
        <>
          <NavBar />
          <Component {...props} />
        </>
        )
      : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
)
