import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import CartProvider from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import OrderManagement from "./pages/admin/OrderManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import UserManagement from "./pages/admin/UserManagement";

import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ProductDetails from "./components/ProductDetails";

import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";
import Login from "./components/UserLogin";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Determine if current route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          {/* Render proper navbar */}
          {isAdminRoute ? <AdminNavbar /> : <UserNavbar onSearch={setSearchQuery} />}

          <Routes>
            <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
<Route path="/product/:id" element={<ProductDetails />} />

            {/* Admin routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-orders" element={<OrderManagement />} />
            <Route path="/admin-products" element={<ProductManagement />} />
            <Route path="/admin-users" element={<UserManagement />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}
