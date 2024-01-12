import { Link } from "react-router-dom"

const ErrorPageGeneric = () => {
  return (
    <div className="container">
      <div className="error-page">
        <h1>Error</h1>
        <h3 className="mb-1-5">Something went wrong</h3>
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

export default ErrorPageGeneric
