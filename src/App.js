import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterLogin from "./RegisterLogin";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Logout from "./Auth/Logout";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import SingleProduct from "./components/SingleProduct";
import Checkout from "./components/Checkout";


// ✅ Import Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


export default function App() {
  return (
    // ✅ Wrap everything with Contexts
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<RegisterLogin />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/logout" element={<Logout />} />
<Route path="/product/:id" element={<SingleProduct />} />yes
<Route
  path="/checkout"
  element={
    <ProtectedRoute role="user">
      <Checkout />
    </ProtectedRoute>
  }
/>

              {/* Protected routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute role="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
