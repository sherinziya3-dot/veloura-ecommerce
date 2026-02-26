import { useNavigate } from "react-router-dom";

export function logout() {
  const session = JSON.parse(localStorage.getItem("Veloura_session"));
  if (session) {
    localStorage.removeItem("Veloura_session");
    localStorage.removeItem(`cart_${session.user.id}`);
    localStorage.removeItem(`wishlist_${session.user.id}`);
    alert("✅ Logged out successfully");
    window.location.href = "/login"; // safe redirect
  }
}
