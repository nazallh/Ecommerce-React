import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./views/components/Navbar";
import Footer from "./views/components/Footer";

import Home from "./views/pages/Home";
import Shop from "./views/pages/Shop";
import Auth from "./views/pages/Auth";
import ProductDetails from "./views/pages/ProductDetails";
import Cart from "./views/pages/Cart";
import Checkout from "./views/pages/Checkout";

function App() {
  return (
    <Router>

     
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      
      <Footer />

    </Router>
  );
}

export default App;