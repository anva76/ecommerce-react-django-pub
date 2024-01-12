import { useEffect, useState } from "react"
import { useGlobalContext } from "../store/context/globalContext"
import { PageTitle } from "../components"
import OrderRow from "../components/OrderRow"
import ErrorPageData from "./ErrorPageGeneric"
import * as ACTIONS from "../store/actions/actions"
import { _fetchOrders } from "../utils/netUtils"

const OrderListPage = () => {
  const { genericDispatch, fetchError, token } = useGlobalContext()
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    genericDispatch({ type: ACTIONS.ORDERS_LOADING })
    const res = await _fetchOrders(token)
    if (!res.error) {
      setOrders(res.payload)
    } else {
      setOrders(null)
      genericDispatch({ type: ACTIONS.ORDERS_ERROR })
    }
    genericDispatch({
      type: ACTIONS.ORDERS_LOADING_DONE,
    })
  }

  useEffect(() => {
    fetchOrders()
    window.scrollTo(0, 0)
  }, [])

  if (fetchError) return <ErrorPageData />

  return (
    orders && (
      <section className="container-left">
        <PageTitle title="Orders" />
        <section className="order-section">
          <h4 className="grid-item-start">Order Number</h4>
          <h4>Status</h4>
          <h4>Total Amount</h4>
          <h4>Updated</h4>
          <h4>Submitted</h4>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
            />
          ))}
        </section>
      </section>
    )
  )
}

export default OrderListPage
