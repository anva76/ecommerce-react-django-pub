import CartRow from "./CartRow"

const CartTable = ({ withBtns, items }) => {
  const calcTotal = () => {
    let total = 0.0
    for (let item of items) {
      const finalPrice = item.discounted_price
        ? item.discounted_price
        : item.price
      total += parseFloat(finalPrice) * item.quantity
    }
    return total
  }

  return (
    <section className="container-left">
      <div className="cart-section mb-1-5">
        <h4 className="grid-item-start">#</h4>
        <h4 className="grid-item-start">Product</h4>
        <h4></h4>
        <h4>Price</h4>
        <h4>Quantity</h4>
        <div></div>
        <h4 className="grid-item-end">Subtotal</h4>

        {items.map((item, index) => (
          <CartRow
            key={item.id}
            num={index + 1}
            {...item}
            withBtns={withBtns}
          />
        ))}
      </div>
      <div className="cart-table-footer">
        <h3>Total</h3>
        <h3>⌑{calcTotal().toFixed(2)}</h3>
      </div>
    </section>
  )
}

export default CartTable
