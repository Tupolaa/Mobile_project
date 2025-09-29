import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#202020ff",
  },
  title: {
    color: "#ffffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
