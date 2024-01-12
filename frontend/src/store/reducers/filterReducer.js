import { UPDATE_SORT, UPDATE_FILTERS, CLEAR_FILTERS } from "../actions/actions"

const filterReducer = (state, action) => {
  // Sorting
  if (action.type === UPDATE_SORT) {
    return { ...state, filters: { ...state.filters, sort: action.payload } }
  }

  // Filtering
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: action.payload.filters,
      filtersApplied: action.payload.filtersApplied,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return action.payload
  }

  throw new Error(`filterReducer: Undefined action type - "${action.type}"`)
}

export default filterReducer
