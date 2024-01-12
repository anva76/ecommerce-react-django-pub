import { useNavigate, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useGlobalContext } from "../store/context/globalContext"
import { FaSpinner } from "react-icons/fa"
import { PageTitle } from "../components"
import { toast } from "react-toastify"

const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    regInProgress: loading,
    isAuthenticated,
  } = useGlobalContext()

  const validate = (data) => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    //console.log(data)

    if (data.password !== data.password2) {
      toast.error("Passwords do not match.")
      return
    }

    delete data.password2
    data["name"] = "test user"
    if (await register(data)) {
      navigate("/login")
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <PageTitle title="Registration" />
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
            placeholder="This is a demo project - don't use real data"
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
        <div className="login-grp">
          <label
            className="login-label"
            htmlFor="password"
          >
            Repeat password
          </label>
          <input
            className="login-input"
            type="password"
            name="password2"
            id="password2"
            required
          />
        </div>
        <button
          type="submit"
          className="user-btn"
          disabled={loading ? true : false}
        >
          Register
          {loading && <FaSpinner className="btn-spinner" />}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
