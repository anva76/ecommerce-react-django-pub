import { PageTitle } from "../components"
import { CartTable } from "../components"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../store/context/globalContext"
import EmptyCartPage from "./EmptyCartPage"

const CartPage = () => {
  const { cartItems } = useGlobalContext()

  if (cartItems.length === 0) return <EmptyCartPage />

  return (
    <section className="container-left">
      <PageTitle title="Cart" />
      <CartTable
        withBtns
        items={cartItems}
      />
      <div className="bottom-section">
        <Link
          to="/checkout"
          className="user-btn"
        >
          Checkout
        </Link>
      </div>
    </section>
  )
}

export default CartPage
