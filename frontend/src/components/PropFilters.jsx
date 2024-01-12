import config from "../reactConfig"
import { useGlobalContext } from "../store/context/globalContext"

const PropFilters = () => {
  const filterList = config.filterChoices
  const { filters, updateFilters } = useGlobalContext()

  const handleFilterSelect = (e) => {
    const name = e.target.name
    const value = e.target.value
    //console.log(name, value)
    if (value !== "all") {
      updateFilters({ ...filters, props: { ...filters.props, [name]: value } })
    } else {
      const newProps = { ...filters.props }
      delete newProps[name]
      updateFilters({ ...filters, props: newProps })
    }
  }

  return (
    <div className="prop-filter-box">
      {filterList.map((filter) => (
        <div
          className="filter-grp"
          key={filter.name}
        >
          <h5 className="filter-title">{filter.name}</h5>
          <select
            className="size-input"
            name={filter.name}
            onChange={handleFilterSelect}
            value={
              filters.props[filter.name] ? filters.props[filter.name] : "all"
            }
          >
            {filter.values.map((item) => (
              <option
                key={item}
                value={item.toLowerCase()}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

export default PropFilters
