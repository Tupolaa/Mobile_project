import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Search, Discover, Profile } from "./icons";

export default function Navbar() {
  const navigation = useNavigation();
  const [active, setActive] = useState("home");
  const insets = useSafeAreaInsets(); // bottom inset, täl saadaan se navbar ylös häiritsemäst laitteen navigointipalkkia

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

        {/* Reviews Screen, for testing only */}
        <TouchableOpacity onPress={() => handlePress("Review", "review")}>
          <Home color={active === "review" ? "#2D64AC" : "#a31993ff"} />
        </TouchableOpacity>

        {/* Form Screen, for testing only */}
        <TouchableOpacity onPress={() => handlePress("Form", "form")}>
          <Home color={active === "form" ? "#2D64AC" : "#4ea319ff"} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => handlePress("Search")}>
          <Search color={active === "search" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress("Discover")}>
          <Discover color={active === "discover" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => handlePress("Login", "profile")}>
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
    backgroundColor: "translucent", // tää on se laitteen navigointipalkki-kohta
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
