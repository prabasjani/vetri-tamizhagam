import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/client";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER
  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data?.user);
    } catch (error) {
      setUser(null);
    } finally {
      // minimum 2 second loading
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      setUser(res.data?.user);

      return {
        success: true,
        user: res.data?.user,
        message: res.data?.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
