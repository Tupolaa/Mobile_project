import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Logo({ name }) {
  const insets = useSafeAreaInsets(); // with insets we can dodge the devices nagivation-var/status-bar

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={styles.logo}>
        {/* Here we insert the name we got */}
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "translucent", // this is the devices nagigation-bar/status-bar part
  },
  logo: {
    padding: 15,
    alignItems: "flex-start",
    backgroundColor: "#000000ff",
    borderBottomWidth: 1,
    borderColor: "#424242ff",
  },
  name: {
    color: "#E2E2E2",
    fontSize: 24,
    fontWeight: "bold",
  },
});
