// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); //user.id , user.role, user.username
  const [loading, setLoading] = useState(true);

  // Load token on app start
  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          setUser(decoded);
        } catch (err) {
          console.error("Failed to decode token:", err);
          setUser(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      setUser(jwtDecode(newToken));
    } catch (err) {
      console.error("Failed to decode token:", err);
      setUser(null);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
