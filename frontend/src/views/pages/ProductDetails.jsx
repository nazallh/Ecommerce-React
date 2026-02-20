import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductById } from "../../controllers/productController";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(id);

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <>
      <Navbar />

      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => navigate("/shop")}
        >
          ← Back to Products
        </button>

        <div className="details-card">
          <img src={product.image} alt={product.name} />

          <div className="details-info">
            <h2>{product.name}</h2>
            <p className="price">Price: ${product.price}</p>
            <p className="desc">
              Description: Latest smartphone with advanced features.
            </p>

            <div className="quantity">
              <label>Quantity: </label>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <div className="details-buttons">
              <button className="cart-btn">Add to Cart</button>
              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;