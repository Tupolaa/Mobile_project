import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ReviewCard = ({ review, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{review.movie?.title ?? "Unknown movie"}</Text>
      <Text style={styles.content}>{review.comment}</Text>
      <Text style={styles.rating}>⭐ {review.rating}</Text>
      <Text style={styles.date}>
        {new Date(review.updatedAt ?? review.createdAt).toLocaleDateString('en-GB')}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this review?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete(review._id),
              },
            ]
          )
        }
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => onEdit(review)}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    position: "relative",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  content: { fontSize: 14, marginTop: 4 },
  rating: { fontSize: 14, marginTop: 4 },
  date: { fontSize: 12, marginTop: 4, color: "gray" },
  deleteButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButton: {
    position: "absolute",
    right: 80,
    bottom: 12,
    backgroundColor: "#2D64AC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  editText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});

export default ReviewCard;
