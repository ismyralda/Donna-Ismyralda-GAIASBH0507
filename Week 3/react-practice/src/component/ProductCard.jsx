import './ProductCard.css'

function ProductCard({ 
  id,
  name = "Unknown Product",
  price = 0,
  image = "/placeholder.jpg",
  isOnSale = false,
 })
  {
  const formattedPrice = Number(price).toFixed(2);
  return (
    <div className="product-card">
      <h2>{isOnSale ? "On Sale!" : "Not on Sale..."}</h2>
      <a href={image} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={name}
          style={{ width: "200px", borderRadius: "4px", cursor: "pointer" }}
        />
      </a>
      <h2>{name}</h2>
      <p className="priceTag">RM{formattedPrice}</p>
      <br />
      <br />
    </div>
  );
}

export default ProductCard
