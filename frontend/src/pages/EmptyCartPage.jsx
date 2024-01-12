import { Link } from "react-router-dom"

const EmptyCartPage = () => {
  return (
    <section className="container">
      <div className="empty-cart">
        <h3 className="mb-1-5">Cart is empty...</h3>
        <Link
          to="/catalog"
          className="user-btn"
        >
          Back to Catalog
        </Link>
      </div>
    </section>
  )
}

export default EmptyCartPage
