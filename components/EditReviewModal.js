// EditReviewModal.js
// A small modal component that allows a user to edit an existing review.
//
// Props:
// - visible (boolean): controls whether the modal is shown
// - onClose (function): callback invoked when the modal should close (Cancel or after Save)
// - review (object): the review being edited. Expected shape: { _id, comment, rating, movie: { title } }
// - token (string): authentication token required by the backend API when updating the review
// - onUpdate (function): callback invoked with the updated review object after a successful save
//
// Behaviour:
// - Initializes local state (text, rating) from `review` prop
// - Keeps local state in sync when `review` prop changes
// - Calls `updateReviewById` from services/backendAPI to persist changes
// - On success calls `onUpdate(updated)` then `onClose()`
//
// Note: This file only adds UI and delegates network calls to `services/backendAPI`.
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { updateReviewById } from "../services/backendAPI";
import Slider from "@react-native-community/slider";

export default function EditReviewModal({
  visible,
  onClose,
  review,
  token,
  onUpdate,
}) {
  // Local controlled state for the editable fields.
  // We copy initial values from `review` so the user can edit them without mutating props.
  const [text, setText] = useState(review?.comment || "");
  const [rating, setRating] = useState(review?.rating || 0);

  useEffect(() => {
    // If the `review` prop changes (for example, user selects a different review to edit),
    // reset the local input fields to reflect the new review content.
    setText(review?.comment || "");
    setRating(review?.rating || 0);
  }, [review]);

  const handleSave = async () => {
    try {
      // Call backend API to update the review. The service should return the updated review object.
      const updated = await updateReviewById(token, review._id, {
        comment: text,
        rating,
      });

      // Let parent know about the updated review so it can refresh lists/UI.
      onUpdate(updated);

      // Close the modal after successful save.
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!review) return null; // safety check

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          
          {/* Header */}
          <Text style={styles.header}>Update Your Review</Text>

          {/* Show the movie title if available, otherwise fall back to 'Unknown' */}
          <Text style={styles.subHeader}>
            {`Movie: ${review.movie?.title ?? "Unknown"}`}
          </Text>

          {/* Rating slider - use integer steps between 1 and 5 */}
          <Text style={styles.label}>Your Rating ⭐: {rating} </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={rating}
            onValueChange={setRating} // updates local rating state
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#ccc"
          />

          {/* Multiline comment input bound to local state */}
          <Text style={styles.label}>Your Comment:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            multiline
            placeholder="Write your review..."
          />

          {/* Action buttons: Cancel just closes, Save performs handleSave */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 20,
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
