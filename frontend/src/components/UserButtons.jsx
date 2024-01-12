import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../store/context/globalContext"
import { FaUser, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const UserButtons = () => {
  const { cartItems, isAuthenticated, userName, userEmail, logout } =
    useGlobalContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <>
      <Link
        to="/cart"
        className="user-btn"
      >
        Cart
        <div className="cart-box">
          <FaShoppingCart />
          {cartItems?.length > 0 && (
            <span className="cart-number">{cartItems.length}</span>
          )}
        </div>
      </Link>
      {isAuthenticated || (
        <Link
          to="/login"
          className="user-btn"
        >
          Login
        </Link>
      )}
      {isAuthenticated && (
        <div className="auth-user-box">
          <FaUser />
          <span style={{ marginLeft: "3px" }}>{userName}</span>
          <button
            className="signout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </>
  )
}

export default UserButtons
