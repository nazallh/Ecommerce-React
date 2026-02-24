import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, updateQuantity, removeItem, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-title">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <h3>Your cart is empty</h3>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>

                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                >
                  {[1,2,3,4,5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>

                <div>${item.price * item.quantity}</div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total: ${getTotal()}</h3>
            </div>

            <div className="cart-buttons">
              <button
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/auth", { state: { from: "/checkout" } })
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;