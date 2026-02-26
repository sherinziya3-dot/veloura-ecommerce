export function getSession() {
  return JSON.parse(localStorage.getItem("session")) || null;
}

export function setSession(user) {
  localStorage.setItem("session", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("session");
   localStorage.removeItem("cart_guest");
     localStorage.removeItem("wishlist");
  // optional: clear cart and wishlist
  const session = getSession();
  if (session?.user?.id) {
    localStorage.removeItem(`cart_${session.user.id}`);
    localStorage.removeItem(`wishlist_${session.user.id}`);
  }
}
