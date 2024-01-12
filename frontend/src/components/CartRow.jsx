import { AiOutlineClose, AiOutlineUp, AiOutlineDown } from "react-icons/ai"
import { useGlobalContext } from "../store/context/globalContext"
import { Link } from "react-router-dom"
import ProductImage from "./ProductImage"

const CartRow = ({
  id,
  name,
  image,
  price,
  discounted_price,
  quantity,
  num,
  withBtns,
}) => {
  const { updateItemQuantity, deleteItem } = useGlobalContext()

  const finalPrice = discounted_price ? discounted_price : price
  const subtotal = quantity * finalPrice

  return (
    <>
      <div className="grid-item-start">{num}</div>
      <ProductImage
        className="cart-image grid-item-start"
        image={image}
      />
      <div className="grid-item-start">
        <Link
          to={`/catalog/${id}`}
          className="cart-nav-link"
        >
          {name}
        </Link>
      </div>
      <div>${finalPrice}</div>
      <div className="cart-quantity-box">
        {withBtns && (
          <button
            className="cart-plus-btn"
            onClick={() => updateItemQuantity(id, 1)}
          >
            <AiOutlineUp />
          </button>
        )}
        {quantity}
        {withBtns && (
          <button
            className="cart-minus-btn"
            onClick={() => updateItemQuantity(id, -1)}
          >
            <AiOutlineDown />
          </button>
        )}
      </div>
      <div>
        {withBtns && (
          <button
            className="cart-del-btn"
            onClick={() => deleteItem(id)}
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      <div className="grid-item-end">${subtotal.toFixed(2)}</div>
    </>
  )
}

export default CartRow
