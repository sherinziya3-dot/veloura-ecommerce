
import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../utils/isAuthenticated";

export default function ProtectedRoute({ children, admin }) {
  const session = getSession();

  if (!session) return <Navigate to="/login" replace />;

  if (admin && session.user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
