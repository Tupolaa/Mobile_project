/*
  context/AuthContext.js
  Manages user authentication state, token storage, and automatic logout on token expiry.
  Uses React Context to provide auth data and functions throughout the app.
*/
import React, { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useRef is used to store the logout timeout ID between renders
  const logoutTimeoutRef = useRef(null);

  // Clears any existing logout timeout
  const clearLogoutTimeout = () => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }
  };

  // Sets up an automatic logout when token expires
  const setupAutoLogout = (decodedToken) => {
    clearLogoutTimeout();
    const expiresIn = decodedToken.exp * 1000 - Date.now(); // milliseconds until expiration

    if (expiresIn > 0) {
      // Schedule logout when token expires
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
        alert("Session expired. Please log in again.");
      }, expiresIn);
    } else {
      // If token is already expired, log out immediately
      logout();
    }
  };

  // Runs when the app starts
  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        const isValid = await checkToken(storedToken);
        if (isValid) {
          setToken(storedToken); 
          const decoded = jwtDecode(storedToken);
          setUser({
            id: decoded.id,
            role: decoded.role,
            username: decoded.username,
          });
          setupAutoLogout(decoded); // Setup auto logout based on token expiry
        } else {
          // Remove invalid/expired token from storage
          await AsyncStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    })();

    // Cleanup timer when component unmounts
    return () => clearLogoutTimeout();
  }, []);

  // Checks if token is valid and not expired
  const checkToken = async (storedToken) => {
    try {
      const decoded = jwtDecode(storedToken);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        console.log("Token expired.");
        return false;
      }
      return true;
    } catch (err) {
      console.log("Invalid token:", err);
      return false;
    }
  };

  // Saves token on login and starts auto-logout timer
  const login = async (newToken) => {
    await AsyncStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setUser({
        id: decoded.id,
        role: decoded.role,
        username: decoded.username,
      });
      setupAutoLogout(decoded);
    } catch (err) {
      console.error("Failed to decode token:", err);
      setUser(null);
    }
  };

  // Logs out user, removes token and clears timeout
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
    clearLogoutTimeout();
  };

  // Provides authentication data and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
