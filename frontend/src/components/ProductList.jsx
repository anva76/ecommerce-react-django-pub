import { useNavigate } from "react-router-dom"
import { ProductImage } from "../components"

const ProductList = ({ products }) => {
  const navigate = useNavigate()

  const renderPrice = (product) => {
    if (product.discounted_price) {
      return (
        <div className="price-grp">
          <div className="product-price">${product.discounted_price}</div>
          <div className="product-old-price">${product.price}</div>
        </div>
      )
    } else {
      return <div className="product-price">${product.price}</div>
    }
  }

  return (
    products && (
      <div
        className="flexi-grid"
        id="product_list"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/catalog/${product.id}`)}
          >
            <ProductImage
              className="product-image"
              image={product.image}
            />

            <div className="product-footer">
              <h4>{product.name}</h4>
              {renderPrice(product)}
            </div>
          </div>
        ))}
      </div>
    )
  )
}

export default ProductList
