import { createContext, useContext, useReducer } from "react"
import { toast } from "react-toastify"
import cartReducer from "../reducers/cartReducer"
import authReducer from "../reducers/authReducer"
import filterReducer from "../reducers/filterReducer"
import genericReducer from "../reducers/genericReducer"
import { SORT_LATEST } from "../../sortTypes"
import { isEqual } from "lodash"

import * as ACTIONS from "../actions/actions"

import {
  _fetchOrders,
  _fetchSingleOrder,
  _fetchProducts,
  _fetchFeaturedProducts,
  _fetchSingleProduct,
  _submitOrder,
  _login,
  _register,
} from "../../utils/netUtils"

// -------------------------------------------------------

const initialGenericState = {
  ordersLoading: false,
  productsLoading: false,
  categoriesAndBrandsLoading: false,
  fetchError: false,
  numProducts: 0,
}

const initialFilterState = {
  filters: {
    query: "",
    brand: -1,
    category: -1,
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    sort: SORT_LATEST,
    props: {},
  },
  filtersApplied: false,
}

const initialCartState = {
  cartItems: [],
  orderInProgress: false,
  orderSubmitError: false,
  orderError: false,
}

const initialAuthState = {
  token: null,
  isAuthenticated: false,
  userName: null,
  userEmail: null,
  authInProgress: false,
  authError: false,
  regInProgress: false,
  regError: false,
}

const getAuthStorageOrDefault = () => {
  let storageObj = sessionStorage.getItem("_sessdt")

  if (storageObj) {
    storageObj = JSON.parse(storageObj)

    const newState = {
      ...initialAuthState,
      token: storageObj.token,
      userName: storageObj.userName,
      userEmail: storageObj.userEmail,
      isAuthenticated: true,
    }
    return newState
  } else {
    return initialAuthState
  }
}

const getCartStorageOrDefault = () => {
  let storageObj = localStorage.getItem("_cartdt")

  if (storageObj) {
    storageObj = JSON.parse(storageObj)

    const newState = {
      ...initialCartState,
      cartItems: storageObj.cartItems,
    }
    return newState
  } else {
    return initialCartState
  }
}

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [genericState, genericDispatch] = useReducer(
    genericReducer,
    initialGenericState
  )

  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    getCartStorageOrDefault()
  )

  const [authState, authDispatch] = useReducer(
    authReducer,
    getAuthStorageOrDefault()
  )

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  )

  // Filters
  const updateSort = (e) => {
    let filtersApplied = false
    const value = e.target.value
    const filters = { ...filterState.filters, sort: value }

    if (!isEqual(filters, initialFilterState.filters)) {
      filtersApplied = true
    }

    filterDispatch({
      type: ACTIONS.UPDATE_FILTERS,
      payload: { filters, filtersApplied },
    })
  }

  const updateFilters = (filters) => {
    let filtersApplied = false

    if (!isEqual(filters, initialFilterState.filters)) {
      filtersApplied = true
    }

    filterDispatch({
      type: ACTIONS.UPDATE_FILTERS,
      payload: { filters, filtersApplied },
    })
  }

  const clearFilters = () => {
    filterDispatch({
      type: ACTIONS.CLEAR_FILTERS,
      payload: { ...initialFilterState },
    })
  }

  // Cart
  const addItem = (item) => {
    cartDispatch({ type: ACTIONS.ADD_ITEM, payload: item })
  }

  const updateItemQuantity = (id, delta) => {
    cartDispatch({ type: ACTIONS.UPDATE_ITEM, payload: { id, delta } })
  }

  const deleteItem = (id) => {
    cartDispatch({ type: ACTIONS.DELETE_ITEM, payload: { id } })
  }

  const clearCart = () => {
    cartDispatch({ type: ACTIONS.CLEAR_CART })
  }

  const submitOrder = async (data) => {
    cartDispatch({ type: ACTIONS.ORDER_SUBMIT_IN_PROGRESS })
    const res = await _submitOrder(data, authState.token)

    if (!res.error) {
      cartDispatch({ type: ACTIONS.ORDER_SUBMIT_DONE })
      cartDispatch({ type: ACTIONS.CLEAR_CART })
      toast.info("Order has been successfully submitted.")
      return true
    } else {
      cartDispatch({ type: ACTIONS.ORDER_SUBMIT_ERROR })
      toast.error("Something went wrong. Unable to submit the order.")
      return false
    }
  }

  // Auth
  const login = async (data) => {
    authDispatch({ type: ACTIONS.LOGIN_IN_PROGRESS })
    const res = await _login(data)

    if (!res.error) {
      authDispatch({ type: ACTIONS.LOGIN_DONE, payload: res.payload })
      toast.info("You have successfully logged in.")
    } else {
      authDispatch({ type: ACTIONS.LOGIN_ERROR })
      toast.error(
        "Authorization failed. Please check your user name and password and try again."
      )
    }
  }

  const logout = () => {
    authDispatch({
      type: ACTIONS.UPDATE_AUTH,
      payload: { ...initialAuthState },
    })
    sessionStorage.removeItem("_sessdt")
  }

  const register = async (data) => {
    authDispatch({ type: ACTIONS.REGISTRATION_IN_PROGRESS })
    const res = await _register(data)

    if (!res.error) {
      authDispatch({ type: ACTIONS.REGISTRATION_DONE })
      toast.info("Registration is successful.")
      return true
    } else {
      authDispatch({ type: ACTIONS.REGISTRATION_ERROR })
      //console.log(res.error.response)
      const data = res.error.response.data
      toast.error(
        <div>
          Registration failed.
          <ul>
            {data &&
              Object.entries(data).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
          </ul>
        </div>
      )
      return false
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        ...filterState,
        ...cartState,
        ...authState,
        ...genericState,
        genericDispatch,
        updateSort,
        updateFilters,
        clearFilters,
        addItem,
        updateItemQuantity,
        deleteItem,
        submitOrder,
        clearCart,
        login,
        logout,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
