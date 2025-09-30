import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ReviewFormScreen from "./screens/ReviewFormScreen";
import Category from "./screens/Category";
import MovieListScreen from "./screens/MovieList";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TestScreen from "./screens/TestScreen";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <View style={styles.container}>
            {/* Header */}
            <Header title="CRITIQ" />
            <View style={styles.stackContainer}>
              {/* Vaihda tähän initalRouteName mist haluut alottaa */}
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen name="ReviewForm" component={ReviewFormScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Category" component={Category} />
                <Stack.Screen name="Movies" component={MovieListScreen} />
              </Stack.Navigator>
            </View>

            {/* Navbar */}
            <Navbar />
          </View>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stackContainer: {
    flex: 1, // Stack takes all space above the navbar
  },
});
