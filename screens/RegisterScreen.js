import React, { useState, useContext } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import StyledButton from "../components/StyledButton";
import { registerRequest } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    setMessage("");
    try {
      const data = await registerRequest(username, password);

      if (data.token) {
        await login(data.token); // automatically log in after register
        navigation.replace("Profile");
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <StyledButton title="Register" onPress={handleRegister} />
      <StyledButton
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
