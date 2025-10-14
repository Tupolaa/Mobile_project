// screens/LoginScreen.js
// Simple login screen used to authenticate a user.
//
// Behaviour:
// - Collects username and password
// - Calls `loginRequest` to authenticate against the backend
// - On success calls `login(token)` from `AuthContext` to persist token and schedule auto-logout
// - Navigates to 'Profile' screen on successful login
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "@env";
import StyledButton from "../components/StyledButton";
import { loginRequest } from "../services/authService";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setMessage("");
    try {
      const data = await loginRequest(username, password);
      // Pass the received token to the AuthContext `login` function which
      // will store it in AsyncStorage and decode user info.
      await login(data.token);

      // Replace current route with Profile so the user cannot go back to login
      navigation.replace("Profile");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue to your profile</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {message ? <Text style={styles.error}>{message}</Text> : null}

        <StyledButton title="Login" onPress={handleLogin} style={styles.primaryButton} />
        <Text style={styles.notLoggedSubtitle}>Don't have an account?</Text>
        <StyledButton
          title="Create account"
          onPress={() => navigation.navigate("Register")}
          style={[styles.secondaryButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#E2E2E2" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12, textAlign: "center" },
  notLoggedSubtitle: { fontSize: 14, color: "#666", marginTop: 12, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  error: { color: "#c62828", marginBottom: 8, textAlign: "center" },
  primaryButton: { marginVertical: 6 },
  secondaryButton: { marginVertical: 6, backgroundColor: "#808080ff" },
});
