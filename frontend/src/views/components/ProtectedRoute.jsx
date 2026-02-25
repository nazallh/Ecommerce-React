import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // simple example

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;