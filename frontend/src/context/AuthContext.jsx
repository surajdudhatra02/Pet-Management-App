"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    console.log(apiURL);

    try {
      const response = await axios.post(`${apiURL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token) {
        throw new Error("No authentication token received from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role || "user");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        token,
        role: user.role || "user",
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return { role: user.role || "user" };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || "user",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};