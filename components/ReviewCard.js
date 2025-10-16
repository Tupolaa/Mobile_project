import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ReviewCard = ({ review, onDelete, onEdit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{review.movie?.title ?? "Unknown movie"}</Text>
      <Text style={styles.content}>{review.comment}</Text>
      <View style={styles.bottomRow}>
        <View style={styles.meta}>
          <Text style={styles.rating}>⭐ {review.rating}</Text>
          <Text style={styles.date}>
            {new Date(review.updatedAt ?? review.createdAt).toLocaleDateString('en-GB')}
          </Text>
        </View>

        <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(review)}
          accessibilityLabel={`Edit review for ${review.movie?.title}`}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
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
          accessibilityLabel={`Delete review for ${review.movie?.title}`}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  content: { fontSize: 14, marginTop: 4 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  meta: {
    flexDirection: "column",
    justifyContent: "center",
  },
  rating: { fontSize: 14 },
  date: { fontSize: 12, color: "gray", marginTop: 4 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
    minWidth: 68,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#2D64AC",
  },
  deleteButton: {
    backgroundColor: "#c62828",
  },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});

export default ReviewCard;
