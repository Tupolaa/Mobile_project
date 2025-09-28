import React, { use, useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

// Emulator IP for Android, LAN IP for real phone
const BACKEND_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://192.168.1.231:5000';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/mobileAuth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await res.json();
      if (data.token) {
        await login(data.token);
        setMessage('Logged in!');
        console.log('Token:', data.token); //DELETE THIS LATER
        navigation.replace("Test"); // replaces Login in stack so user cannot go back
      }
    } catch (err) {
      setMessage('Network error: ' + err.message);
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});

