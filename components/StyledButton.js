// StyledButton.js
// A small, reusable button component used across the app.
//
// Props:
// - title (string): text displayed inside the button
// - onPress (function): callback fired when the button is pressed
// - style (object|array): optional style(s) to merge with the default button container styles
// - textStyle (object|array): optional style(s) to merge with the default text styles
// - ...props: any other TouchableOpacity props (accessibility, disabled, testID, etc.)
//
// The component is intentionally minimal — it composes a `TouchableOpacity` and a `Text`
// element and exposes the common extension points via `style` and `textStyle`.
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function StyledButton({ title, onPress, style, textStyle, ...props }) {
  // Use array merging so callers can override or extend default styles.
  // We also forward any additional props to the TouchableOpacity so callers
  // can supply accessibility props, `disabled`, or event handlers.
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

// Default styles for the button container and text.
// Keep these descriptive and small so they are easy to override from the call site.
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2D64AC",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
