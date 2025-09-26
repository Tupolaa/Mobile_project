import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    color: "#000000ff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
