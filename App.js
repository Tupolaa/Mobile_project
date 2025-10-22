/**
 * App.js
 * 
 * Main entry point for the mobile app.
 * 
 * Structure overview:
 * - GestureHandlerRootView: enables gesture handling across the app.
 * - SafeAreaProvider: keeps content within safe display areas (avoids notches, etc.).
 * - AuthProvider: wraps the app to provide authentication context.
 * - NavigationContainer: handles screen navigation using React Navigation.
 * - Stack.Navigator: defines app screens and navigation flow.
 * - Logo: displays the app name/logo at the top.
 * - Navbar: persistent bottom navigation bar.
 */

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //The root wrapper for React Navigation — manages navigation state.
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //A stack-based screen transition system (like iOS page pushes).
import { GestureHandlerRootView } from "react-native-gesture-handler"; //Required for react-native-gesture-handler to work properly (for swipes, pans, etc.).
import { SafeAreaProvider } from "react-native-safe-area-context"; //Ensures layout respects notches, status bars, and other safe areas.

import { StatusBar } from "expo-status-bar"; //Controls status bar color and style.
import { AuthProvider } from "./context/AuthContext"; //A custom context provider that shares authentication state (e.g., user login info) across the app.
import HomeScreen from "./screens/HomeScreen";
import Category from "./screens/Category";
import Profile from "./screens/ProfileScreen";
import ReviewScreen from "./screens/ReviewScreen";
import FormScreen from "./screens/FormScreen";
import MovieScreen from "./screens/MovieScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TestScreen from "./screens/TestScreen";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";

// Create navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="dark" />

            <View style={styles.container}>
              {/* Insert app name here */}
              <Logo name="CRITIQ" />
              <View style={styles.stackContainer}>
                {/* initalRouteName = where the app starts off */}
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Category" component={Category} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen name="Review" component={ReviewScreen} />
                  <Stack.Screen name="Form" component={FormScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="MovieScreen" component={MovieScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen name="Test" component={TestScreen} />
                </Stack.Navigator>
              </View>

              {/* Navbar */}
              <Navbar />
            </View>
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stackContainer: {
    flex: 1,
  },
});
