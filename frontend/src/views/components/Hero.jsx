import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero3.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-content">
        <h1>Welcome to Our Store</h1>
        <p>Where Quality Meets Affordability.</p>
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