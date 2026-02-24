import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";


function Checkout() {
  const { cartItems, getTotal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const handlePlaceOrder = () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.postalCode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    alert("Order Placed Successfully ✅");

    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <>
        
        <div className="checkout-container">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate("/shop")}>
            Go to Shop
          </button>
        </div>
      </>
    );
  }

  return (
    <>
     

      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-content">

          {/* LEFT SIDE */}
          <div className="left-section">

            <div className="checkout-card">
              <h3>Shipping Details</h3>

              <input
                type="text"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={(e) =>
                  setShipping({ ...shipping, fullName: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={(e) =>
                  setShipping({ ...shipping, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Address"
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="City"
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={(e) =>
                  setShipping({ ...shipping, postalCode: e.target.value })
                }
              />
            </div>

            <div className="checkout-card">
              <h3>Payment Method</h3>

              <label className="payment-row">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>

              <label className="payment-row">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>

              <label className="payment-row">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="right-section">
            <div className="checkout-card">
              <h3>Order Summary</h3>

              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">

                  <div className="summary-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-img"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <div>
                    ${item.price * item.quantity}
                  </div>

                </div>
              ))}

              <hr />

              <div className="summary-total">
                <strong>Total:</strong>
                <strong>${getTotal()}</strong>
              </div>

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;