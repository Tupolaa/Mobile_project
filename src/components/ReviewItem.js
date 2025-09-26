import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReviewItem({ item }) {
  return (
    <View style={styles.row}>
      <Text style={styles.username}>{item.user.username}</Text>
      <Text style={styles.movie}>{item.movie.title}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 15,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  movie: {
    marginBottom: 4,
  },
  rating: {
    marginBottom: 4,
  },
  comment: {
    marginBottom: 4,
  },
});
