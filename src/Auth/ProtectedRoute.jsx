import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  
  const session = JSON.parse(localStorage.getItem("Veloura_session") || "null");

  if (!session || !session.isLoggedIn || session.role !== role) {
    return <Navigate to="/login" replace />;
  }if (role && session.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
