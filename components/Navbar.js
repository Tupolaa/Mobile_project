import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Search, Discover, Profile } from "./icons";

/**
 * Navbar component
 *
 * A bottom navigation bar that provides quick access to main screens.
 * Highlights the active route and respects device safe areas.
 *
 * Screens included:
 * - Home
 * - Category (represented with the Search icon)
 * - Profile
 */
export default function Navbar() {
  const navigation = useNavigation();
  const [active, setActive] = useState("home"); // Home is our inital route, so it could be activated at get-go.
  const insets = useSafeAreaInsets(); // with insets we can dodge the devices nagivation-var/status-bar

  /**
   * Handles icon press:
   * - Updates the active icon state
   * - Navigates to the selected route
   *
   * @param {string} route - Screen name to navigate to
   * @param {string} name - Icon identifier for active state
   */
  const handlePress = (route, name) => {
    setActive(name);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Navbar background only for visible area */}
      <View style={styles.navbar}>
        {/* Home Screen */}
        <TouchableOpacity onPress={() => handlePress("Home", "home")}>
          <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>

        {/* Category Screen */}
        <TouchableOpacity onPress={() => handlePress("Category", "search")}>
          <Search color={active === "search" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>

        {/* Profile Screen */}
        <TouchableOpacity onPress={() => handlePress("Profile", "profile")}>
          <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>
      </View>

      {/* Extra spacing so navbar content is above device bottom */}
      <View style={{ height: insets.bottom }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "translucent", // this is the devices nagigation-bar/status-bar part
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#424242ff",
    backgroundColor: "#E2E2E2",
  },
});
