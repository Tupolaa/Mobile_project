import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Emulator IP for Android, LAN IP for real phone
const BACKEND_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://192.168.1.231:5000';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setMessage(''); // reset message
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
        await AsyncStorage.setItem('token', data.token);
        setMessage('Logged in! Token saved.');
        console.log('Token:', data.token);
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
      <Text style={{ marginTop: 10 }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4, width: '100%' },
});
