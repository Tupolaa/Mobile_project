import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";
import Category from "./screens/Category";
// Niko laittaa ton päälle ku se on valmis
// import Profile from "./screens/ProfileScreen";
import ReviewScreen from "./screens/ReviewScreen";
import FormScreen from "./screens/FormScreen";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TestScreen from "./screens/TestScreen";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <View style={styles.container}>
            {/* Logo */}
            <Logo name="CRITIQ" />
            <View style={styles.stackContainer}>
              {/* Vaihda tähän initalRouteName mist haluut alottaa */}
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Category" component={Category} />
                {/* Niko laittaa ton päälle ku se on valmis */}
                {/* <Stack.Screen name="Profile" component={Profile} /> */}
                <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen name="Form" component={FormScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
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
