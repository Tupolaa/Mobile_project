import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Logo({ name }) {
  const insets = useSafeAreaInsets(); // bottom inset, täl saadaan se navbar ylös häiritsemäst laitteen navigointipalkkia

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={styles.logo}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "translucent", // tää on se laitteen navigointipalkki-kohta
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
