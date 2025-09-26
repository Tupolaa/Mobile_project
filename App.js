import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import TestScreen from './components/TestScreen';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Testing App Screens</Text>
      <RegisterScreen />
      <View style={{ height: 20 }} />
      <LoginScreen />
      <View style={{ height: 20 }} />
      <TestScreen />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
