import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check if a token exists

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
