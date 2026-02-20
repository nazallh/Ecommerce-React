function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🛒 NexCart</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Shop</li>
        <li>Cart</li>
        <li>Login</li>
      </ul>

      <button className="signup-btn">Sign Up</button>
    </nav>
  );
}

export default Navbar;