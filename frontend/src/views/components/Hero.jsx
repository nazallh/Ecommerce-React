import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Store</h1>
        <p>Best Deals on Latest Products</p>
        <button
          className="shop-btn"
          onClick={() => navigate("/shop")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default Hero;