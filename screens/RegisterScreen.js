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
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <StyledButton title="Register" onPress={handleRegister} />
      <StyledButton title="Go to Login" onPress={() => navigation.navigate("Login")} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center", backgroundColor: "#E2E2E2" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
