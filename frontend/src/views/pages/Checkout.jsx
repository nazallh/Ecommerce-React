import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, total } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });

  /* =========================
      LOAD RAZORPAY SCRIPT
  ========================= */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  /* =========================
        PLACE ORDER
  ========================= */
  const handlePlaceOrder = async () => {

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

    /* ======================
            COD ORDER
    ====================== */
    if (paymentMethod === "cod") {

      await fetch("http://localhost:5000/api/payment/cod-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartItems,
          shipping,
          total
        })
      });

      alert("COD Order Placed ✅");
      navigate("/");
      return;
    }

    /* ======================
        LOAD RAZORPAY
    ====================== */
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK failed");
      return;
    }

    /* ======================
        CREATE ORDER (BACKEND)
    ====================== */
    const orderRes = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total })
      }
    );

    const order = await orderRes.json();

    /* ======================
        RAZORPAY OPTIONS
    ====================== */
    const options = {
      key: "rzp_test_SKHp9BhaeXtSQs",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "NexCart",
      description: "Order Payment",

      /* PAYMENT SUCCESS */
      handler: async function (response) {

        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...response,
              cartItems,
              shipping,
              total
            })
          }
        );

        const data = await verifyRes.json();

        if (data.success) {
          alert("Payment Successful ✅ Order Saved");
          navigate("/");
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: shipping.fullName,
        contact: shipping.phone
      },

      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  /* ======================
        EMPTY CART
  ====================== */
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  /* ======================
            UI
  ====================== */
  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">

        {/* LEFT SIDE */}
        <div className="left-section">

          <div className="checkout-card">
            <h3>Shipping Details</h3>

            <input
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={(e) =>
                setShipping({ ...shipping, fullName: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />

            <input
              placeholder="Address"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
            />

            <input
              placeholder="City"
              value={shipping.city}
              onChange={(e) =>
                setShipping({ ...shipping, city: e.target.value })
              }
            />

            <input
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
              Online Payment (Razorpay)
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

                <div>₹{item.price * item.quantity}</div>

              </div>
            ))}

            <hr />

            <div className="summary-total">
              <strong>Total:</strong>
              <strong>₹{total}</strong>
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
  );
}

export default Checkout;