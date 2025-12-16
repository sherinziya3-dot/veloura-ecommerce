import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create context
const WishlistContext = createContext();

// ✅ Named export for Provider
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("Veloura_wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("Veloura_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("Veloura_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("Veloura_wishlist");
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// ✅ Named export for hook
export const useWishlist = () => useContext(WishlistContext);
