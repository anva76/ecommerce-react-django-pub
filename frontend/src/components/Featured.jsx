import { useGlobalContext } from "../store/context/globalContext"
import ErrorBar from "./ErrorBar"
import ProductList from "./ProductList"
import { useEffect, useState } from "react"
import { _fetchFeaturedProducts } from "../utils/netUtils"
import * as ACTIONS from "../store/actions/actions"

const Featured = () => {
  const { genericDispatch, fetchError } = useGlobalContext()
  const [products, setProducts] = useState(null)

  const fetchFeaturedProducts = async () => {
    genericDispatch({ type: ACTIONS.FEAT_PRODUCTS_LOADING })
    const res = await _fetchFeaturedProducts()
    if (!res.error) {
      setProducts(res.payload)
    } else {
      setProducts(null)
      genericDispatch({ type: ACTIONS.PRODUCTS_ERROR })
    }
    genericDispatch({ type: ACTIONS.FEAT_PRODUCTS_LOADING_DONE })
  }

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  if (fetchError)
    return (
      <section className="flexi-section">
        <ErrorBar />
      </section>
    )

  return (
    <>
      <section className="flexi-section">
        <h2>Featured products</h2>
      </section>
      <ProductList products={products} />
    </>
  )
}

export default Featured
