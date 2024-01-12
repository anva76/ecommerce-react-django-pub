import { useGlobalContext } from "../store/context/globalContext"
import { useEffect, useState, Suspense } from "react"
import { Sort, Filters, ProductList, PageTitle, ErrorBar } from "../components"
import ErrorPageData from "./ErrorPageData"
import {
  _fetchProducts,
  _fetchBrandsAndCategories,
  _fetchProductsBrandsCategories,
} from "../utils/netUtils"
import * as ACTIONS from "../store/actions/actions"

const Catalog = () => {
  const {
    fetchError,
    filters,
    clearFilters,
    filtersApplied,
    genericDispatch,
  } = useGlobalContext()

  const [products, setProducts] = useState(null)
  const [brands, setBrands] = useState(null)
  const [categories, setCategories] = useState(null)

  const fetchBrandsAndCategories = async () => {
    genericDispatch({ type: ACTIONS.BRANDS_CATEGORIES_LOADING })
    const res = await _fetchBrandsAndCategories()
    if (!res.error) {
      setBrands(res.payload.brands)
      setCategories(res.payload.categories)
    } else {
      setBrands(null)
      setCategories(null)
      genericDispatch({ type: ACTIONS.BRANDS_CATEGORIES_ERROR })
    }
    genericDispatch({
      type: ACTIONS.BRANDS_CATEGORIES_LOADING_DONE,
    })
  }

  const fetchProducts = async () => {
    let numProducts = 0
    genericDispatch({ type: ACTIONS.PRODUCTS_LOADING })
    const res = await _fetchProducts(filters)
    if (!res.error) {
      setProducts(res.payload)
      numProducts = res.payload.length
    } else {
      setProducts(null)
      genericDispatch({ type: ACTIONS.PRODUCTS_ERROR })
    }
    genericDispatch({
      type: ACTIONS.PRODUCTS_LOADING_DONE,
      payload: { numProducts },
    })
  }

  const initialScroll = () => {
    let mql = window.matchMedia("(min-width: 768px)")
    if (mql.matches) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById("product_list")
      element && element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    fetchBrandsAndCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
    initialScroll()
  }, [filters])

  if (fetchError) return <ErrorPageData />

  return (
    <section className="container-left">
      <PageTitle title="Catalog" />
      <Sort />
      <section className="catalog-section">
        <Filters
          brands={brands}
          categories={categories}
        />

        {products?.length !== 0 ? (
          <ProductList products={products} />
        ) : (
          filtersApplied && (
            <div className="empty-product-list">
              <p>No products found</p>
              <button
                className="user-btn"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )
        )}
      </section>
    </section>
  )
}

export default Catalog
