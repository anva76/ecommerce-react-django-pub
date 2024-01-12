import { useEffect, useState, useRef } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { PageTitle, ProductDetail, ProductImage } from "../components"
import ErrorPageGeneric from "./ErrorPageGeneric"
import { useGlobalContext } from "../store/context/globalContext"
import { toast } from "react-toastify"
import { _fetchSingleProduct } from "../utils/netUtils"
import * as ACTIONS from "../store/actions/actions"

const ProductPage = () => {
  const { id } = useParams()
  const { addItem, genericDispatch, fetchError } = useGlobalContext()

  const [product, setProduct] = useState(null)

  const { name, image, price, discounted_price, brand, description } =
    product || {}

  const quantityRef = useRef()
  const navigate = useNavigate()

  const fetchSingleProduct = async (id) => {
    genericDispatch({ type: ACTIONS.PRODUCTS_LOADING })
    const res = await _fetchSingleProduct(id)
    if (!res.error) {
      setProduct(res.payload)
    } else {
      setProduct(null)
      genericDispatch({ type: ACTIONS.PRODUCTS_ERROR })
    }
    genericDispatch({ type: ACTIONS.PRODUCTS_LOADING_DONE })
  }

  const handleCartSubmit = (e) => {
    e.preventDefault()
    const quantity = parseInt(quantityRef.current.value)
    addItem({ ...product, quantity })
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    toast.info("Product was added to the cart.")
  }

  useEffect(() => {
    fetchSingleProduct(id)
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const renderPrice = () => {
    if (product.discounted_price) {
      return (
        <div className="price-grp">
          <div className="product-price">${discounted_price}</div>
          <div className="product-old-price">${price}</div>
        </div>
      )
    } else {
      return <div className="product-price">${price}</div>
    }
  }

  if (fetchError) return <ErrorPageGeneric />

  return (
    product && (
      <div className="container">
        <PageTitle
          title={name}
          product
        />
        <section className="flexi-section">
          <Link
            to="/catalog"
            className="user-btn"
          >
            Back to Catalog
          </Link>
        </section>
        <section className="flexi-section">
          <ProductImage
            image={image}
            className="large-product-image"
          />
          <div className="product-details">
            <h2>{name}</h2>
            {renderPrice()}
            <div className="article-text">{description}</div>
            {product.brand && (
              <ProductDetail
                title="Brand"
                value={brand}
              />
            )}
            {product.props &&
              Object.entries(product.props).map(([key, value]) => (
                <ProductDetail
                  key={key}
                  title={key}
                  value={value}
                />
              ))}
          </div>
        </section>
        <form
          className="product-add-form"
          onSubmit={handleCartSubmit}
        >
          <div className="quantity-group">
            <label
              className="form-label"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              ref={quantityRef}
              name="quantity"
              type="number"
              className="quantity_input"
              min="1"
              max="10"
              defaultValue="1"
            />
          </div>

          <button
            type="submit"
            className="add-btn"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="add-btn-outline"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </button>
        </form>
      </div>
    )
  )
}

export default ProductPage
