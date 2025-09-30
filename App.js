// import React from "react";
// import { StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";

// import { AuthProvider } from "./context/AuthContext";

// import HomeScreen from "./screens/HomeScreen";
// import Category from "./screens/Category";
// import MovieListScreen from "./screens/MovieList";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import TestScreen from "./screens/TestScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <AuthProvider>
//         <NavigationContainer>
//           <StatusBar style="dark" />
//           {/* Vaihda tähän mist haluut alottaa */}
//           <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//             <Stack.Screen name="Test" component={TestScreen} />
//             <Stack.Screen name="Category" component={Category} />
//             <Stack.Screen name="Movies" component={MovieListScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </AuthProvider>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./context/AuthContext";

import HomeScreen from "./screens/HomeScreen";
import Category from "./screens/Category";
import MovieListScreen from "./screens/MovieList";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TestScreen from "./screens/TestScreen";

import Navbar from "./components/Navbar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <View style={styles.container}>
            {/* Stack screens take all space above the navbar */}
            <View style={styles.stackContainer}>
              <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Category" component={Category} />
                <Stack.Screen name="Movies" component={MovieListScreen} />
              </Stack.Navigator>
            </View>

            {/* Navbar stays at the bottom */}
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
