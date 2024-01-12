import { useGlobalContext } from "../store/context/globalContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const AuthGuard = ({ element }) => {
  const { isAuthenticated } = useGlobalContext()
  const { pathname } = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ returnTo: pathname }}
      />
    )
  }

  return element
}

export default AuthGuard
