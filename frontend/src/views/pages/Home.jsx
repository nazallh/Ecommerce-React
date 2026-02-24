import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../controllers/productController";

function Home() {
  const products = getAllProducts();

  // Show only first 4 products
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      
      <Hero />

      <section className="products-section">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
    </>
  );
}

export default Home;