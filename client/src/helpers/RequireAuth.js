import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import NavBar from '../features/NavBar'

export const RequireAuth = ({ children }) => {
  let token = window.localStorage.getItem('token') || null

  if (token) {
    const decodedToken = jwtDecode(token)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      window.localStorage.removeItem('token')

      token = null
    }
  }

  return token
    ? (
      <>
        <NavBar />
        {children}
      </>
      )
    : <Navigate to='/login' />
}

export default RequireAuth
