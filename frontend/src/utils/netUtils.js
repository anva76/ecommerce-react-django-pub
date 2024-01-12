import axios from "axios"
import config from "../reactConfig"

const formatProductUrl = (baseUrl, filters) => {
  let url = baseUrl + "?"

  if (filters.sort) {
    url += `sort=${filters.sort}&`
  }

  if (filters.query) {
    url += `search=${filters.query}&`
  }

  if (filters.category !== -1) {
    url += `category_id=${filters.category}&`
  }

  if (filters.brand !== -1) {
    url += `brand_id=${filters.brand}&`
  }

  if (filters.color !== "all") {
    url += `color=${filters.color}&`
  }

  if (filters.minPrice && filters.minPrice !== 0) {
    url += `min_price=${filters.minPrice}&`
  }

  if (filters.maxPrice && filters.maxPrice !== 0) {
    url += `max_price=${filters.maxPrice}&`
  }

  for (let item of config.filterChoices) {
    const filterValue = filters.props[item.name]
    const filterName = item.name
    if (filterValue && filterValue !== "all") {
      url += `${filterName.toLowerCase()}=${filterValue}&`
    }
  }

  return url
}

export const _fetchOrders = async (token) => {
  const res = { payload: null, error: null }
  const url = config.orderUrl

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchSingleOrder = async (id, token) => {
  const res = { payload: null, error: null }
  const url = config.orderUrl

  try {
    const response = await axios.get(url + `${id}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchProducts = async (filters) => {
  const res = { payload: null, error: null }
  try {
    let url = formatProductUrl(config.productUrl, filters)
    let response = await axios.get(url)

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchBrandsAndCategories = async () => {
  const res = { payload: null, error: null }
  try {
    let url = config.categoryUrl
    let response = await axios.get(url)
    const categories = response.data
    categories.splice(0, 0, { id: -1, name: "All" })

    url = config.brandUrl
    response = await axios.get(url)
    const brands = response.data
    brands.splice(0, 0, { id: -1, name: "All" })

    res["payload"] = { categories, brands }
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchProductsBrandsCategories = async (filters) => {
  const res = { payload: null, error: null }
  try {
    let url = config.categoryUrl
    let response = await axios.get(url)
    const categories = response.data
    categories.splice(0, 0, { id: -1, name: "All" })

    url = config.brandUrl
    response = await axios.get(url)
    const brands = response.data
    brands.splice(0, 0, { id: -1, name: "All" })

    url = formatProductUrl(config.productUrl, filters)
    response = await axios.get(url)
    const products = response.data

    res["payload"] = { products, categories, brands }
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchFeaturedProducts = async () => {
  const res = { payload: null, error: null }
  try {
    const { productUrl, featuredUrl_ } = config

    const url = `${productUrl}?${featuredUrl_}`
    const response = await axios.get(url)

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _fetchSingleProduct = async (id) => {
  const res = { payload: null, error: null }
  try {
    const response = await axios.get(config.productUrl + `${id}`)

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _submitOrder = async (data, token) => {
  const res = { payload: null, error: null }
  try {
    const url = config.orderUrl
    const response = await axios.post(url, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    //console.log(response.data)

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _login = async (data) => {
  const res = { payload: null, error: null }
  try {
    let response = await axios.post(config.loginUrl, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const token = response.data.token

    response = await axios.get(config.userInfoUrl, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    const user = response.data

    res["payload"] = { token, user }
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}

export const _register = async (data) => {
  const res = { payload: null, error: null }
  try {
    let response = await axios.post(config.registerUrl, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    res["payload"] = response.data
    return res
  } catch (error) {
    res["error"] = error
    return res
  }
}
