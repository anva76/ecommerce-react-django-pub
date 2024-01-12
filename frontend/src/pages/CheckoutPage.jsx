import { PageTitle, CartTable, OrderForm } from "../components"
import { useGlobalContext } from "../store/context/globalContext"
import EmptyCartPage from "./EmptyCartPage"

const CheckoutPage = () => {
  const { cartItems } = useGlobalContext()

  if (cartItems.length === 0) return <EmptyCartPage />

  return (
    <section className="container-left">
      <PageTitle title="Checkout" />
      <div className="flexi-section">
        <h3>Please check your order:</h3>
      </div>
      <CartTable items={cartItems} />
      <div className="flexi-section">
        <h3>Please provide your delivery address:</h3>
      </div>
      <OrderForm />
    </section>
  )
}

export default CheckoutPage
