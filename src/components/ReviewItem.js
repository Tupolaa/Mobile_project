import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReviewItem({ item }) {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.movie}>{item.movie.title}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 15,
  },
  row: {
    padding: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#424242ff",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  movie: {
    marginBottom: 2,
  },
  rating: {
    marginBottom: 2,
  },
  comment: {
    marginBottom: 2,
  },
});
