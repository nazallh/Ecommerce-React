import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../controllers/productController";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Load product safely
  useEffect(() => {
    const foundProduct = getProductById(parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
  <div className="details-container">

    {/* LEFT SIDE */}
    <div className="details-left">

      {/* Back Button Top Left */}
      <button
        className="back-link-btn"
        onClick={() => navigate("/shop")}
      >
        ← Back to All Products
      </button>

      {/* Product Image */}
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="details-info">
      <h2>{product.name}</h2>
      <p className="price">${product.price}</p>

      <label>Quantity:</label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      <div className="details-buttons">
  <button
    className="cart-btn"
    onClick={() => {
      addToCart(product, quantity);
      navigate("/cart");
    }}
  >
    Add to Cart
  </button>

  <button
    className="buy-btn"
    onClick={() => {
      addToCart(product, quantity);
      navigate("/auth");
    }}
  >
    Buy Now
  </button>
</div>
    </div>

  </div>
);
}

export default ProductDetails;