import { useGlobalContext } from "../store/context/globalContext"
import PropFilters from "./PropFilters"
import QueryFilter from "./QueryFilter"
import ColorFilter from "./ColorFilter"
import CategoryAndBrandFilters from "./CategoryAndBrandFilters"
import PriceMinMaxFilter from "./PriceMinMaxFilter"

const Filters = ({ brands, categories }) => {
  const { clearFilters, filtersVisible } = useGlobalContext()

  if (!filtersVisible) return

  return (
    <section className="filter-box">
      <div className="filter-grp">
        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>
      <QueryFilter />
      <CategoryAndBrandFilters
        brands={brands}
        categories={categories}
      />
      <ColorFilter />
      <PropFilters />
      <PriceMinMaxFilter />
      <div className="filter-grp">
        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>
    </section>
  )
}

export default Filters
