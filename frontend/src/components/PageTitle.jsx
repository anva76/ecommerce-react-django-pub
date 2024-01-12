import { Link } from "react-router-dom"

const PageTitle = ({ title, product, order }) => {
  return (
    <section className="navi-box">
      <h3>
        <Link
          to="/"
          className="nav-link2"
        >
          Home
        </Link>
        {product && (
          <Link
            to="/catalog"
            className="nav-link2"
          >
            / Catalog
          </Link>
        )}
        {order && (
          <Link
            to="/orders"
            className="nav-link2"
          >
            / Orders
          </Link>
        )}
        / <span className="active">{title}</span>
      </h3>
    </section>
  )
}

export default PageTitle
