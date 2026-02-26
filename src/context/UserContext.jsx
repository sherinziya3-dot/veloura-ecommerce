import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [admins] = useState([
    { id: "1", username: "admin", password: "12345", role: "admin" }
  ]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("Veloura_users")) || [];
    setUsers(storedUsers);
  }, []);

  const registerUser = (user) => {
    const updated = [...users, { ...user, active: true }];
    setUsers(updated);
    localStorage.setItem("Veloura_users", JSON.stringify(updated));
  };

  const loginUser = (email, password) => {
    const user = users.find(
      u => u.email === email && u.password === password && u.active !== false
    );
    return user || null;
  };

  const loginAdmin = (username, password) => {
    return admins.find(
      a => a.username === username && a.password === password
    ) || null;
  };

  return (
    <UserContext.Provider
      value={{ users, registerUser, loginUser, loginAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
