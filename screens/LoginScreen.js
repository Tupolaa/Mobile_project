import React, { use, useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
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
      await login(data.token);
      navigation.replace("Profile");
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
      <StyledButton title="Login" onPress={handleLogin} />
      <StyledButton
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
