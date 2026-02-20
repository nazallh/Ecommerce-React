import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../controllers/productController";

function Shop() {
  const navigate = useNavigate();
  const products = getAllProducts();

  return (
    <>
      <Navbar />

      <div className="shop-container">

        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <h2 className="shop-title">All Products</h2>

        <div className="shop-content">

          {/* Sidebar */}
          <div className="sidebar">
            <h4>Categories</h4>
            <ul>
              <li><input type="radio" name="cat" /> Cameras</li>
              <li><input type="radio" name="cat" /> Phones</li>
              <li><input type="radio" name="cat" /> Shoes</li>
              <li><input type="radio" name="cat" /> Watches</li>
            </ul>

            <h4>Price</h4>
            <select>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>

          {/* Products */}
          <div className="shop-products">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;