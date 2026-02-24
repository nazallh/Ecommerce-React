import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../controllers/productController";

function Shop() {
  const navigate = useNavigate();

  const allProducts = getAllProducts();

  // 🔥 Search and sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "low" or "high"

  // 🔥 Filtered and sorted products
  const filteredProducts = allProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>
     

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

          {/* Products */}
          <div className="shop-products">
            <div className="shop-filters" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" }}>
              {/* Search */}
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
              />

              {/* Price Sort */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minWidth: "180px" }}
              >
                <option value="">Sort by Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>

            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>

        </div>
      </div>

      
    </>
  );
}

export default Shop;