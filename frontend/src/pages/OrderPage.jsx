import { useEffect, useState } from "react"
import { OrderForm, PageTitle, CartTable } from "../components"
import ErrorPageData from "./ErrorPageGeneric"
import { useGlobalContext } from "../store/context/globalContext"
import { useParams, Link } from "react-router-dom"
import { _fetchSingleOrder } from "../utils/netUtils"
import * as ACTIONS from "../store/actions/actions"

const OrderPage = () => {
  const { genericDispatch, fetchError, token } = useGlobalContext()
  const [order, setOrder] = useState(null)

  const { id } = useParams()

  const formatOrderItems = () => {
    const orderItems = order.order_items.map((item, index) => ({
      id: item.product.id,
      name: item.product.name,
      image: item.product.image,
      price: item.price,
      quantity: item.quantity,
      num: index + 1,
    }))

    return orderItems
  }

  const fetchSingleOrder = async (id) => {
    genericDispatch({ type: ACTIONS.ORDERS_LOADING })
    const res = await _fetchSingleOrder(id, token)
    if (!res.error) {
      setOrder(res.payload)
    } else {
      setOrder(null)
      genericDispatch({ type: ACTIONS.ORDERS_ERROR })
    }
    genericDispatch({ type: ACTIONS.ORDERS_LOADING_DONE })
  }

  useEffect(() => {
    fetchSingleOrder(id)
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (fetchError) return <ErrorPageData />

  return (
    order && (
      <div className="container-left">
        <PageTitle
          title={order.order_number}
          order
        />
        <div className="flexi-section">
          <Link
            to="/orders"
            className="user-btn"
          >
            Back to Orders
          </Link>
        </div>
        <div className="grey-header">Order Details</div>
        <div className="order-details">
          <div className="form-group">
            <div className="form-label">Order Number</div>
            <div className="form-input">{order.order_number}</div>
          </div>
          <div className="form-group grid-item-end">
            <div className="form-label">Status</div>
            <div className="form-input">{order.status}</div>
          </div>
        </div>
        <div className="grey-header">Delivery Address</div>
        <OrderForm
          readOnly
          displayOrder={order}
        />
        <div className="grey-header">Order Items</div>
        <CartTable items={formatOrderItems()} />
      </div>
    )
  )
}

export default OrderPage
