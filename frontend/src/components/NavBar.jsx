import { NavLink } from "react-router-dom"
import UserButtons from "./UserButtons"
import { useGlobalContext } from "../store/context/globalContext"

const NavBar = () => {
  const { isAuthenticated } = useGlobalContext()

  return (
    <nav
      className="nav-bar"
      id="navigation"
    >
      <div className="nav-center">
        <NavLink
          to="/"
          className="nav-link"
        >
          <span className="logo">Trendy Tech</span>
        </NavLink>
        <div className="nav-links">
          <NavLink
            to="/"
            className="nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className="nav-link"
          >
            Catalog
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/orders"
              className="nav-link"
            >
              My Orders
            </NavLink>
          )}
        </div>
        <div className="user-buttons">
          <UserButtons />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
