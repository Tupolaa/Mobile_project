import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { updateReviewById } from "../services/backendAPI";

export default function EditReviewModal({ visible, onClose, review, token, onUpdate }) {
  const [text, setText] = useState(review?.comment || "");

  useEffect(() => {
    setText(review?.comment || "");
  }, [review]);

  const handleSave = async () => {
    try {
      const updated = await updateReviewById(token, review._id, { comment: text });
      onUpdate(updated);
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
          <Text style={styles.header}>Update Your Review</Text>
          <Text style={styles.subHeader}>
            {`Movie: ${review.movie?.title ?? "Unknown"}`}
          </Text>
          <Text style={styles.label}>Your Comment:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            multiline
            placeholder="Write your review..."
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
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
    fontSize: 14,
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
