import { Link } from "react-router-dom"

const ErrorPage404 = () => {
  return (
    <div className="container">
      <div className="error-page">
        <h1>404</h1>
        <h3>Page not found</h3>
        <Link
          to="/"
          className="user-btn"
        >
          Back Home
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage404
