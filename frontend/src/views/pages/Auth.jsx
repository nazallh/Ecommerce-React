import Navbar from "../components/Navbar";

function Auth() {
  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">

          <div className="auth-left">
            <h2 className="login-title">Login</h2>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="login-btn">Login</button>
          </div>

          <div className="auth-right">
            <h2 className="register-title">Register</h2>

            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button className="register-btn">Register</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Auth;