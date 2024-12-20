import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import UserButtons from "./UserButtons"
import { useGlobalContext } from "../store/context/globalContext"
import HamburgerButton from "./HamburgerButton"

const NavBar = () => {
  const { isAuthenticated, showFilters, hideFilters } = useGlobalContext()

  // Resize event listener to show and hide the filter bar based on screen size
  const resizeListener = () => {
    const largeScreen = window.matchMedia("(min-width: 768px)").matches

    if (largeScreen) {
      showFilters()
    } else {
      hideFilters()
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeListener)
    return () => window.removeEventListener("resize", resizeListener) //Cleanup
  }, [])
  // ------------------

  return (
    <nav
      className="nav-bar"
      id="navigation"
    >
      <div className="nav-center">
        <div className="logo-and-button-grp">
          <NavLink
            to="/"
            className="nav-link"
          >
            <span className="logo">Trendy Tech</span>
          </NavLink>
          <HamburgerButton />
        </div>

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
