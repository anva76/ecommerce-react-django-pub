import { Link } from "react-router-dom"

const ErrorPageData = () => {
  return (
    <div className="container">
      <div className="error-page">
        <h1>Error</h1>
        <h3 className="mb-1-5">Unable to fetch data</h3>
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

export default ErrorPageData
