import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, logout, setSession } from "../utils/isAuthenticated";
import "../styles/navbar.css";
import { RiDashboardLine } from "react-icons/ri";
import { RiProductHuntLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const session = getSession();


  const handleLogout = () => {
    logout();
    setSession(null);
    navigate("/admin-login");
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h3 className="logo" onClick={() => navigate("/admin-dashboard")}>
          VELOURA Admin
        </h3>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {session?.user?.role === "admin" && (
<>
            <Link to="/admin-dashboard">
              <RiDashboardLine size={35} color="#C9A24D" />
            </Link>

            <Link to="/admin-products">
              <RiProductHuntLine size={35} color="#C9A24D" />
            </Link>

            <Link to="/admin-users">
              <RiUserLine size={35} color="#C9A24D" />
            </Link>

            <Link to="/admin-orders">
              <HiOutlineReceiptRefund size={35} color="#C9A24D" />
            </Link>
          </>
        )}
{session ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <HiUserAdd
  size={35}
  color="#C9A24D"   // Deep Gold
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/register")}
/>
<HiOutlineLogin
  size={35}
  color="#C9A24D"   // Deep Gold
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/login")}
/>
          
          </>
        )}
        
      </div>
    </div>
  );
}
