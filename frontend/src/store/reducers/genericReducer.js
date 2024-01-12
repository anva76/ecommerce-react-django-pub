import * as ACTIONS from "../actions/actions"

const genericReducer = (state, action) => {
  // Products
  if (
    action.type === ACTIONS.PRODUCTS_LOADING ||
    action.type === ACTIONS.FEAT_PRODUCTS_LOADING
  ) {
    return { ...state, productsLoading: true, fetchError: false }
  }

  if (action.type === ACTIONS.PRODUCTS_LOADING_DONE) {
    return {
      ...state,
      productsLoading: false,
      numProducts: action.payload?.numProducts || 0,
    }
  }

  if (action.type === ACTIONS.FEAT_PRODUCTS_LOADING_DONE) {
    return {
      ...state,
      productsLoading: false,
    }
  }

  if (action.type === ACTIONS.PRODUCTS_ERROR) {
    return { ...state, productsLoading: false, fetchError: true }
  }

  // Orders
  if (action.type === ACTIONS.ORDERS_LOADING) {
    return { ...state, ordersLoading: true, fetchError: false }
  }

  if (action.type === ACTIONS.ORDERS_LOADING_DONE) {
    return { ...state, ordersLoading: false }
  }

  if (action.type === ACTIONS.ORDERS_ERROR) {
    return { ...state, ordersLoading: false, fetchError: true }
  }

  // Brands and Categories
  if (action.type === ACTIONS.BRANDS_CATEGORIES_LOADING) {
    return { ...state, categoriesAndBrandsLoading: true, fetchError: false }
  }

  if (action.type === ACTIONS.BRANDS_CATEGORIES_LOADING_DONE) {
    return { ...state, categoriesAndBrandsLoading: false }
  }

  if (action.type === ACTIONS.BRANDS_CATEGORIES_ERROR) {
    return { ...state, categoriesAndBrandsLoading: false, fetchError: true }
  }

  throw new Error(`genericReducer: Undefined action type - "${action.type}"`)
}

export default genericReducer
