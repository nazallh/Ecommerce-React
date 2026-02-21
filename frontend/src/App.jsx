import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/pages/Home";
import Shop from "./views/pages/Shop";
import Auth from "./views/pages/Auth";
import ProductDetails from "./views/pages/ProductDetails"; 
import Cart from "./views/pages/Cart"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;