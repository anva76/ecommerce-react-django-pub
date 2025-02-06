import { Link } from "react-router-dom"

const OrderRow = ({ order }) => {
  return (
    <>
      <div className="grid-item-start">
        <Link
          to={`/orders/${order.id}`}
          className="cart-nav-link"
        >
          {order.order_number}
        </Link>
      </div>
      <div>{order.status}</div>
      <div>⌑{order.total_amount}</div>
      <div>{new Date(order.updated_at).toLocaleString()}</div>
      <div>{new Date(order.created_at).toLocaleString()}</div>
    </>
  )
}

export default OrderRow
