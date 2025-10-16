// screens/RegisterScreen.js
// User registration screen.
//
// Behaviour:
// - Collects username and password from the user
// - Calls `registerRequest` from `services/authService` to register the user on the backend
// - If the backend returns a token, it automatically logs the user in via AuthContext and
//   navigates to the 'Profile' screen
// - Any messages from the backend or thrown errors are shown in the `message` Text element
import React, { useState, useContext } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import StyledButton from "../components/StyledButton";
import { registerRequest } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  // Local form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // Auth context provides `login` which persists the token and updates app auth state
  const { login } = useContext(AuthContext);

  // Called when user presses the Register button
  const handleRegister = async () => {
    setMessage("");
    try {
      // Sends username/password to backend and expects an object with either
      // { token } on success or { message } on failure.
      const data = await registerRequest(username, password);

      if (data.token) {
        // Automatically log in after successful registration and redirect to Profile
        await login(data.token);
        navigation.replace("Profile");
      } else if (data.message) {
        // Show backend-provided message
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Register to start creating and managing your reviews</Text>

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

        <StyledButton title="Register" onPress={handleRegister} style={styles.primaryButton} />
        <Text style={styles.notLoggedSubtitle}>Already have an account?</Text>
        <StyledButton
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
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
