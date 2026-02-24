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

  useEffect(() => {
    const foundProduct = getProductById(parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    // add product with quantity
    addToCart({ ...product, quantity });

    if (!token) {
      navigate("/auth", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="details-container">

      <div className="details-left">
        <button
          className="back-link-btn"
          onClick={() => navigate("/shop")}
        >
          ← Back to All Products
        </button>

        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

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
              addToCart({ ...product, quantity });
              navigate("/cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;