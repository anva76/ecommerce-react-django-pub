import { useState, useEffect } from "react"
import { useGlobalContext } from "../store/context/globalContext"
import { FaCheck } from "react-icons/fa"

const PriceMinMaxFilter = () => {
  const { filters, updateFilters } = useGlobalContext()
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)

  const parseIntValue = (val) => {
    let res = 0
    if (val !== "") res = parseInt(val)

    return res
  }

  const handleRangeSubmit = (e) => {
    e.preventDefault()

    updateFilters({
      ...filters,
      minPrice: parseIntValue(minPrice),
      maxPrice: parseIntValue(maxPrice),
    })
  }

  useEffect(() => {
    setMinPrice(filters.minPrice)
    setMaxPrice(filters.maxPrice)
  }, [filters])

  return (
    <div className="filter-grp">
      <h5 className="filter-title">Price</h5>
      <form onSubmit={handleRangeSubmit}>
        <div className="range-form-grp">
          <div className="form-label">Min</div>
          <div className="range-grp">
            <input
              type="number"
              className="range-input-min"
              name="max-price"
              placeholder="Min"
              value={minPrice}
              min="0"
              step="10"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <button
              type="submit"
              className="range-btn"
            >
              <FaCheck />
            </button>
          </div>
        </div>
        <div className="range-form-grp">
          <div className="form-label">Max</div>
          <div className="range-grp">
            <input
              type="number"
              className="range-input-max"
              name="min-price"
              placeholder="Max"
              value={maxPrice}
              min="0"
              step="10"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              type="submit"
              className="range-btn"
            >
              <FaCheck />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PriceMinMaxFilter
