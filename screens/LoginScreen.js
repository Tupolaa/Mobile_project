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
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <StyledButton title="Login" onPress={handleLogin} />
      <StyledButton title="Go to Register" onPress={() => navigation.navigate("Register")} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#E2E2E2" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
