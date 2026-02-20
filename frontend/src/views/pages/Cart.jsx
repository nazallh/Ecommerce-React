import { useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product || null;

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-header">Shopping Cart</h2>

        {!product ? (
          <>
            <h3>Your Cart is Empty</h3>
            <button
              className="back-btn"
              onClick={() => navigate("/shop")}
            >
              Back to Products
            </button>
          </>
        ) : (
          <>
            <div className="cart-item">
              <img src={product.image} alt="" />

              <div>
                <h4>{product.name}</h4>
                <p>${product.price}</p>
              </div>

              <div>${product.price} × 1</div>
              <div>${product.price}</div>
            </div>

            <div className="cart-total">
              <h3>Total: ${product.price}</h3>
            </div>

            <div className="cart-buttons">
              <button
                className="back-btn"
                onClick={() => navigate("/shop")}
              >
                Back to Products
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;