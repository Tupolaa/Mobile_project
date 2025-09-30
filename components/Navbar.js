import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Search, Discover, Profile } from "./icons";

// chatgpt lisäs navigation
export default function Navbar({ navigation }) {
  const [active, setActive] = useState("home");

  // chatgpt
  const handlePress = (route, name) => {
    setActive(name);
    navigation.navigate(route);
  };

  // return (
  //   <View style={styles.navbar}>
  //     <TouchableOpacity onPress={() => setActive("home")}>
  //       <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
  //     </TouchableOpacity>

  //     <TouchableOpacity onPress={() => setActive("search")}>
  //       <Search color={active === "search" ? "#2D64AC" : "#424242ff"} />
  //     </TouchableOpacity>

  //     <TouchableOpacity onPress={() => setActive("discover")}>
  //       <Discover color={active === "discover" ? "#2D64AC" : "#424242ff"} />
  //     </TouchableOpacity>

  //     <TouchableOpacity onPress={() => setActive("profile")}>
  //       <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handlePress("Home", "home")}>
        <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("Login", "profile")}>
        <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#424242ff",
    backgroundColor: "#E2E2E2",
    color: "#000000ff",
  },
  link: {
    padding: 5,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
