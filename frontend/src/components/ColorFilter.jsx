import config from "../reactConfig"
import { useGlobalContext } from "../store/context/globalContext"
import { FaCheck } from "react-icons/fa"

const ColorFilter = () => {
  const { filters, updateFilters } = useGlobalContext()

  const handleColorClick = (color) => {
    if (filters.color === color) {
      updateFilters({ ...filters, color: "all" })
      return
    }
    updateFilters({ ...filters, color })
  }

  return (
    <div className="filter-grp">
      <h5 className="filter-title">Colors</h5>
      <div className="color-filter-box">
        {config.colorList.map((clr, index) => (
          <div
            className="color-item"
            key={clr}
            style={{
              background: clr,
              color: index <= 5 ? "#e2f0fd" : "#191970",
            }}
            title={clr}
            onClick={() => handleColorClick(clr)}
          >
            {filters.color === clr ? <FaCheck /> : ""}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorFilter
