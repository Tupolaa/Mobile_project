import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { createReview } from "../services/backendAPI";
import { AuthContext } from "../context/AuthContext";
import { useRoute } from "@react-navigation/native";

export default function FormScreen({ movieId, title, onClose }) {
  // Get auth token and user from context
  const { token, user } = useContext(AuthContext);

  const [rating, setRating] = useState("");   // 1–5 (string from Picker)
  const [comment, setComment] = useState(""); // review text
  const [loading, setLoading] = useState(false); // submit button loading

  
  const route = useRoute();

  // Submit review to backend
  const handleSubmit = async () => {
  
    if (!rating || !comment) {
      Alert.alert("Error", "Please fill out both rating and comment.");
      return;
    }

  
    const reviewData = {
      user: user.id,
      movie: movieId,
      rating: Number(rating),
      comment,
    };

    console.log("Movie ID:", movieId);
    console.log("Movie Title:", title);

    setLoading(true);
    try {
      // Call API to create review
      const newReview = await createReview(token, reviewData);
      console.log("Review created:", newReview);
      Alert.alert("Success", "Your review has been submitted!");

     
      setRating("");
      setComment("");

     
    } catch (err) {
      console.error("Error creating review:", err);
      Alert.alert("Error", "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
      {/* Move content up when keyboard opens */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              {/* movie title */}
              <Text style={styles.title}>
                Write a review for{"\n"}
                {title}
              </Text>

              {/* Rating field */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Rating (1–5):</Text>
                <View style={styles.pickerContainer}>
                  
                </View>
              </View>

              {/* Comment textarea */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Comment:</Text>
                <TextInput
                  style={styles.textarea}
                  multiline
                  numberOfLines={4}
                  placeholder="Write your review..."
                  value={comment}
                  onChangeText={setComment}
                  textAlignVertical="top"
                  disableFullscreenUI={true} 
                />
              </View>

              {/* Submit button */}
              <View style={styles.formGroup}>
                <Button
                  title={loading ? "Submitting..." : "Submit Review"}
                  onPress={handleSubmit}
                  color="#2D64AC"
                  disabled={loading}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#E2E2E2",
  },
  contentContainer: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2D64AC",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: "#424242",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 60,
    width: "100%",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 5,
    padding: 10,
    height: 120,
    backgroundColor: "#fff",
  },
});
