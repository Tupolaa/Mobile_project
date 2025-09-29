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
    padding: 15,
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    borderBottomWidth: 1,
    borderColor: "#424242ff",
  },
  title: {
    color: "#424242ff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
