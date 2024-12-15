import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [hasAccessToken, setHasAccessToken] = useState(
    JSON.parse(localStorage.getItem("hasAccessToken")) || null
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const checkAccessToken = async () => {
    const token = await makeRequest.get("/auth/check-token").then((res) => {
      return res.data;
    });
    setHasAccessToken(token);
  };

  checkAccessToken();

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });
    setHasAccessToken(true);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    if (hasAccessToken) {
      localStorage.setItem("hasAccessToken", JSON.stringify(hasAccessToken));
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      if (localStorage.getItem("user")) localStorage.removeItem("user");
      localStorage.setItem("hasAccessToken", JSON.stringify(hasAccessToken));
    }
  }, [currentUser, hasAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        login,
        currentUser,
        hasAccessToken,
        setCurrentUser,
        setHasAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
