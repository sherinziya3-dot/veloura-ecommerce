import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Load session from LocalStorage on page refresh
  useEffect(() => {
    const session = localStorage.getItem("Veloura_session");
    if (session) setUser(JSON.parse(session));
  }, []);

  // ✅ Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("Veloura_session", JSON.stringify(userData));
  };

  // ✅ Logout function (clears session, cart, wishlist)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("Veloura_session");
    localStorage.removeItem("Veloura_cart");
    localStorage.removeItem("Veloura_wishlist");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook to use AuthContext anywhere
export const useAuth = () => useContext(AuthContext);
