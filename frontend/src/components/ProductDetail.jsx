const ProductDetail = ({ title, value }) => {
  return (
    <div className="product-detail-line">
      <div
        className="bold"
        style={{ textTransform: "capitalize" }}
      >
        {title}:
      </div>
      <div>{value}</div>
    </div>
  )
}

export default ProductDetail
