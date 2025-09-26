// components/TestScreen.js
import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';

const BACKEND_URL = "http://192.168.1.231:5000";
// const BACKEND_URL = 'http://10.0.2.2:5000';

export default function TestScreen() {
  const [response, setResponse] = useState("");

  const testProtected = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      setResponse("No token found! Login first.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/review`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const testUserReviews = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("Token read from storage:", token);
    if (!token) {
      setResponse("No token found! Login first.");
      return;
    }
    console.log("Token exists, proceeding to decode and fetch user reviews.");
    let decoded;
    try {
      decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.error("JWT decode failed:", err.message);
      setResponse("JWT decode failed: " + err.message);
      return;
    }

    console.log("Decoded token:", decoded);
    const userId = decoded.id; // THIS IS THE CORRECT OBJECTID
    console.log("Token:", token);
    console.log("Decoded userId:", userId);
    console.log("Fetch URL:", `${BACKEND_URL}/review/user/${userId}`);

    try {
      const res = await fetch(`${BACKEND_URL}/review/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.text();
        setResponse("Server error: " + errData);
        return;
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Optionally call the server logout endpoint (not strictly needed)
      await fetch(`${BACKEND_URL}/mobileAuth/logout`, {
        method: "POST",
      });

      // Remove token from AsyncStorage
      await AsyncStorage.removeItem("token");
      setResponse("Logged out. Token removed.");
    } catch (err) {
      setResponse("Error during logout: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Test Protected Route" onPress={testProtected} />
      <View style={{ height: 10 }} />
      <Button title="Logout" onPress={handleLogout} color="red" />
      <Text style={{ marginTop: 10 }}>{response}</Text>
      <Button title="Test My Reviews" onPress={testUserReviews} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
});
