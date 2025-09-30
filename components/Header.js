import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ title }) {
  const insets = useSafeAreaInsets(); // bottom inset, täl saadaan se navbar ylös häiritsemäst laitteen navigointipalkkia

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top }} />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "translucent", // tää on se laitteen navigointipalkki-kohta
  },
  header: {
    padding: 15,
    alignItems: "flex-start",
    backgroundColor: "#000000ff",
    borderBottomWidth: 1,
    borderColor: "#424242ff",
  },
  title: {
    color: "#E2E2E2",
    fontSize: 24,
    fontWeight: "bold",
  },
});
