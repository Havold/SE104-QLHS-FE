import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [hasAccessToken, setHasAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  // Kiểm tra token khi ứng dụng khởi động
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await makeRequest.get("/auth/check-token", {
          withCredentials: true,
        });

        if (res.data.isAuthenticated) {
          setHasAccessToken(true);
          setCurrentUser(res.data.user);
        } else {
          setHasAccessToken(false);
          setCurrentUser(null);
        }
      } catch (error) {
        setHasAccessToken(false);
        setCurrentUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  // Cập nhật localStorage khi trạng thái đăng nhập thay đổi
  useEffect(() => {
    if (hasAccessToken) {
      localStorage.setItem("hasAccessToken", "true");
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("hasAccessToken");
      localStorage.removeItem("user");
    }
  }, [hasAccessToken]);

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });
    setHasAccessToken(true);
    setCurrentUser(res.data);
    return res.data.role.name;
  };

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
