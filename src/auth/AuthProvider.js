import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const contextValue = {
    user,
    login(user) {
      setUser(user);
    },
    logout() {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("placa");
      localStorage.removeItem("tipo");
      localStorage.removeItem("ingreso");
      localStorage.removeItem("retiro");
      localStorage.removeItem("fileList");
      localStorage.removeItem("year");
    },
    isLogged() {
      return !!user;
    },
  };
  console.log("desde auth provider " + JSON.stringify(user));
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
