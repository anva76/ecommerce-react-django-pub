import { useEffect } from "react"
import { useGlobalContext } from "../store/context/globalContext"
import { FaSpinner } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const OrderForm = ({ readOnly, displayOrder }) => {
  const {
    orderInProgress: Loading,
    cartItems,
    submitOrder,
  } = useGlobalContext()
  const navigate = useNavigate()

  const getOrderItems = () => {
    let orderItems = []

    if (cartItems) {
      orderItems = cartItems.map((item) => {
        return { product_id: item.id, quantity: item.quantity }
      })
    }
    return orderItems
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    data["order_items"] = getOrderItems()
    //console.log(data)

    if (await submitOrder(data)) {
      navigate("/orders")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="order-form"
    >
      <section className="order-form-section">
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-input"
            name="first_name"
            id="first_name"
            placeholder="This is a demo project - don't use real data"
            required
            autoFocus={!readOnly}
            readOnly={readOnly}
            value={displayOrder?.first_name}
          />
        </div>
        <div className="form-group grid-item-end">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-input"
            name="last_name"
            id="last_name"
            required
            readOnly={readOnly}
            value={displayOrder?.last_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-input"
            name="email"
            id="email"
            required
            readOnly={readOnly}
            value={displayOrder?.email}
          />
        </div>
        <div className="form-group grid-item-end">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-input"
            name="phone"
            id="phone"
            required
            placeHolder={readOnly || "+999-999-999-9999"}
            readOnly={readOnly}
            value={displayOrder?.phone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street_address_1">Street address</label>
          <input
            type="text"
            className="form-input"
            name="street_address_1"
            id="street_address_1"
            required
            readOnly={readOnly}
            value={displayOrder?.street_address_1}
          />
        </div>
        <div className="form-group grid-item-end">
          <label htmlFor="street_address_2">Street address 2</label>
          <input
            type="text"
            className="form-input"
            name="street_address_2"
            id="street_address_2"
            placeholder={readOnly ? "" : "optional"}
            readOnly={readOnly}
            value={displayOrder?.street_address_2}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-input"
            name="city"
            id="city"
            required
            readOnly={readOnly}
            value={displayOrder?.city}
          />
        </div>
        <div className="form-group grid-item-end">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            className="form-input"
            name="province"
            id="province"
            required
            readOnly={readOnly}
            value={displayOrder?.province}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postal_code">Country</label>
          <input
            type="text"
            className="form-input"
            name="country"
            id="country"
            required
            readOnly={readOnly}
            value={displayOrder?.country}
          />
        </div>
        <div className="form-group grid-item-end">
          <label htmlFor="postal_code">Postal code</label>
          <input
            type="text"
            className="form-input"
            name="postal_code"
            id="postal_code"
            required
            readOnly={readOnly}
            value={displayOrder?.postal_code}
          />
        </div>
      </section>
      <div className="bottom-section">
        {readOnly || (
          <button
            type="submit"
            className="user-btn"
            disabled={Loading ? true : false}
          >
            Submit Order
            {Loading && <FaSpinner className="btn-spinner" />}
          </button>
        )}
      </div>
    </form>
  )
}

export default OrderForm
