export const isAuthenticated = () => {
  const session = localStorage.getItem("Veloura_session");
  return !!session;
};
