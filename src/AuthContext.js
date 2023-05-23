import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [access_token, setAuthData] = useState(null);

  const setAuth = (data) => {
    setAuthData(data);
  };

  const value = {
    access_token: access_token ? access_token : null,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
