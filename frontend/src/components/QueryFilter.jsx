import { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { useGlobalContext } from "../store/context/globalContext"

const QueryFilter = () => {
  const { filters, updateFilters } = useGlobalContext()
  const [query, setQuery] = useState(filters.query)

  const handleQuerySubmit = (e) => {
    e.preventDefault()
    updateFilters({ ...filters, query })
  }

  useEffect(() => {
    setQuery(filters.query)
  }, [filters])

  return (
    <form
      onSubmit={handleQuerySubmit}
      className="query-grp"
    >
      <input
        type="text"
        name="query"
        id="query"
        className="query-input"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="query-btn"
      >
        <FaSearch />
      </button>
    </form>
  )
}

export default QueryFilter
