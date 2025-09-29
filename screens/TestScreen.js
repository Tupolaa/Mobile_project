import React, { useContext, useState } from "react";
import { View, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "@env";




export default function TestScreen({navigation}) {
  const { token, user, logout } = useContext(AuthContext);
  const [response, setResponse] = useState("");

  const testUserReviews = async () => {
    if (!token) {
      setResponse("No token found!");
      return;
    }
    try {
      //user.id comes from AuthContext user state
      const res = await fetch(`${BACKEND_URL}/review/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <View>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
      <Button title="Get My Reviews" onPress={testUserReviews} />
      <Button title="Logout" onPress={logout} color="red" />
      <Text>{response}</Text>
    </View>
  );
}
