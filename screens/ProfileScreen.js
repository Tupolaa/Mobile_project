import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import StyledButton from "../components/StyledButton";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Text style={styles.text}>You are not logged in.</Text>
          <StyledButton
            title="Go to Login"
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          />
          <StyledButton
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Welcome, {user.username}!</Text>
          <StyledButton
            title="Logout"
            onPress={logout}
            style={styles.button}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
  button: {
    width: 200,
    alignSelf: "center",
  },
});
