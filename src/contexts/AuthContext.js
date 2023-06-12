import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [access_token, setAuthData] = useState(null);
  const [push_notification_token, setPushNotificationToken] = useState(null);

  const setAuth = (data) => {
    setAuthData(data);
  };

  // Add a new method to update the push token
  const setPushToken = (token) => {
    setPushNotificationToken(token);
  };

  const value = useMemo(
    () => ({
      access_token: access_token ? access_token : null,
      push_notification_token: push_notification_token
        ? push_notification_token
        : null,
      setAuth,
      setPushToken,
    }),
    [access_token, push_notification_token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
