import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  ORDER_SUBMIT_IN_PROGRESS,
  ORDER_SUBMIT_DONE,
  ORDER_SUBMIT_ERROR,
  UPDATE_CART,
} from "../actions/actions"

const PRODUCTS_PER_ITEM = 10

const cartReducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    const id = action.payload.id
    const delta = action.payload.quantity
    let found = false

    const newCart = state.cartItems.map((item) => {
      if (item.id === id) {
        found = true
        let newQuantity = item.quantity + delta
        if (newQuantity > PRODUCTS_PER_ITEM) newQuantity = PRODUCTS_PER_ITEM

        return { ...item, quantity: newQuantity }
      } else {
        return item
      }
    })

    if (!found) {
      newCart.push(action.payload)
    }

    localStorage.setItem("_cartdt", JSON.stringify({ cartItems: newCart }))

    return { ...state, cartItems: newCart }
  }

  if (action.type === UPDATE_ITEM) {
    const id = action.payload.id
    const delta = action.payload.delta

    let newCart = state.cartItems.map((item) => {
      if (item.id === id) {
        let newQuantity = item.quantity + delta

        if (newQuantity < 1) return null
        if (newQuantity > PRODUCTS_PER_ITEM) newQuantity = PRODUCTS_PER_ITEM

        return { ...item, quantity: newQuantity }
      } else {
        return item
      }
    })

    newCart = newCart.filter((item) => item !== null)
    localStorage.setItem("_cartdt", JSON.stringify({ cartItems: newCart }))

    return { ...state, cartItems: newCart }
  }

  if (action.type === DELETE_ITEM) {
    const id = action.payload.id
    const newCart = state.cartItems.filter((item) => item.id !== id)

    localStorage.setItem("_cartdt", JSON.stringify({ cartItems: newCart }))

    return { ...state, cartItems: newCart }
  }

  if (action.type === CLEAR_CART) {
    localStorage.removeItem("_cartdt")
    return { ...state, cartItems: [] }
  }

  if (action.type === ORDER_SUBMIT_IN_PROGRESS) {
    return {
      ...state,
      orderInProgress: true,
      orderSubmitError: false,
    }
  }

  if (action.type === ORDER_SUBMIT_DONE) {
    return { ...state, orderInProgress: false }
  }

  if (action.type === ORDER_SUBMIT_ERROR) {
    return { ...state, orderSubmitError: true, orderInProgress: false }
  }

  if (action.type === UPDATE_CART) {
    return action.payload
  }

  throw new Error(`cartReducer: Undefined action type - "${action.type}"`)
}

export default cartReducer
