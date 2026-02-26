import React from "react";
import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../utils/isAuthenticated";
import "../styles/navbar.css";

import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";

export default function UserNavbar() {
  const navigate = useNavigate();
  const [session, setSession] = React.useState(getSession());

  const handleLogout = () => {
    logout();         
    setSession(null); 
    navigate("/login");
  };

  return (
    <div className="navbar">
      
      <div className="nav-left">
        <h3 className="logo" onClick={() => navigate("/")}>
          VELOURA
        </h3>
      </div>

      
      <div className="nav-right">
        
        <HiOutlineHome
          size={35}
          color="#C9A24D"   
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        {/* Cart */}
        <HiOutlineShoppingBag
          size={35}
          color="#C9A24D"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        />

        {/* Wishlist */}
        <HiOutlineHeart
          size={35}
          color="#C9A24D"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/wishlist")}
        />

        {/* Products */}
        <HiOutlineCube
          size={35}
          color="#C9A24D"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/products")}
        />

      
        {!session && (
          <HiUserAdd
            size={35}
            color="#C9A24D"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          />
        )}

        {/* Login (if not logged in) */}
        {!session && (
          <HiOutlineLogin
            size={35}
            color="#C9A24D"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          />
        )}

        {/* Logout */}
        {session && (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
