import { useGlobalContext } from "../store/context/globalContext"
import { FaFilter } from "react-icons/fa"

import {
  SORT_PRICE_LOW,
  SORT_PRICE_HIGH,
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  SORT_LATEST,
} from "../sortTypes"

const Sort = () => {
  const { numProducts, updateSort, filters, filtersApplied } =
    useGlobalContext()

  return (
    <section className="flexi-section2">
      <div className="filter-info">
        Products found: {numProducts}{" "}
        {filtersApplied && (
          <FaFilter
            className="filter-icon"
            title="Filters are active"
          />
        )}
      </div>
      <form>
        <label
          htmlFor="sort"
          className="sort-label"
        >
          Sort by
        </label>
        <select
          className="sort-input"
          name="sort"
          id="sort"
          value={filters.sort}
          onChange={updateSort}
        >
          <option value={SORT_LATEST}>Latest</option>
          <option value={SORT_PRICE_LOW}>Price (low to high)</option>
          <option value={SORT_PRICE_HIGH}>Price (high to low)</option>
          <option value={SORT_NAME_ASC}>Name (a-z)</option>
          <option value={SORT_NAME_DESC}>Name (z-a)</option>
        </select>
      </form>
    </section>
  )
}

export default Sort
