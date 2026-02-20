import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/pages/Home";
import Shop from "./views/pages/Shop";
import ProductDetails from "./views/pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;