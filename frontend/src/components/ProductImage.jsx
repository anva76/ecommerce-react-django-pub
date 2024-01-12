import defaultImg from "/img-placeholder.png"

const ProductImage = ({ image, className }) => {
  return (
    <img
      src={image ? image : defaultImg}
      className={className}
    />
  )
}

export default ProductImage
