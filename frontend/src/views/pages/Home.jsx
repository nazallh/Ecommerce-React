import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getAllProducts } from "../../controllers/productController";

function Home() {
  const products = getAllProducts();

  return (
    <>
      <Navbar />
      <Hero />

      <div className="products-section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;