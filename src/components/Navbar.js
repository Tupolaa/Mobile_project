import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>🏠</Text>
      </TouchableOpacity>
      {/* Recommendations */}
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>⭐</Text>
      </TouchableOpacity>
      {/* Search */}
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>🔍</Text>
      </TouchableOpacity>
      {/* Login/Register/Profile */}
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>👤</Text>
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
    borderTopColor: "#ffffffff",
    backgroundColor: "#202020ff",
    color: "#ffffffff",
  },
  link: {
    padding: 5,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
