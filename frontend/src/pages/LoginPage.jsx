import {
  useNavigate,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"
import { useEffect } from "react"
import { useGlobalContext } from "../store/context/globalContext"
import { FaSpinner } from "react-icons/fa"
import { PageTitle } from "../components"

const LoginPage = () => {
  const navigate = useNavigate()
  const {
    login,
    authInProgress: loading,
    isAuthenticated,
  } = useGlobalContext()
  const { state } = useLocation()
  const returnTo = state?.returnTo

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    //console.log(data)
    login(data)
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (returnTo) {
        navigate(returnTo)
      } else {
        navigate("/")
      }
    }
  }, [isAuthenticated])

  return (
    isAuthenticated || (
      <div className="container">
        <PageTitle title="Login" />
        <form
          className="login-box"
          onSubmit={handleSubmit}
        >
          <div className="login-grp">
            <label
              className="login-label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="login-input"
              autoFocus
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="login-grp">
            <label
              className="login-label"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <div className="login-button-grp">
            <button
              type="submit"
              className="user-btn"
              disabled={loading ? true : false}
            >
              Login
              {loading && <FaSpinner className="btn-spinner" />}
            </button>
            <button
              type="button"
              className="sec-btn-outline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    )
  )
}

export default LoginPage
