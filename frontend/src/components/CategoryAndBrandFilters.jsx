import { useGlobalContext } from "../store/context/globalContext"
import { _fetchBrandsAndCategories } from "../utils/netUtils"

const CategoryAndBrandFilters = ({ brands, categories }) => {
  const { filters, updateFilters, genericDispatch } = useGlobalContext()

  const handleCategoryClick = (category) => {
    updateFilters({ ...filters, category })
  }

  const handleBrandSelect = (e) => {
    const brand = parseInt(e.target.value)
    updateFilters({ ...filters, brand })
  }

  return (
    <>
      <div className="filter-grp">
        <h5 className="filter-title">Categories</h5>
        <div className="category-list">
          {categories &&
            categories.map((cat) => (
              <div
                key={cat.id}
                className={
                  cat.id === filters.category
                    ? "category-item category-active"
                    : "category-item"
                }
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </div>
            ))}
        </div>
      </div>
      <div className="filter-grp">
        <h5 className="filter-title">Brands</h5>
        <select
          className="brand-input"
          onChange={handleBrandSelect}
          value={filters.brand}
        >
          {brands &&
            brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}
              >
                {brand.name}
              </option>
            ))}
        </select>
      </div>
    </>
  )
}

export default CategoryAndBrandFilters
