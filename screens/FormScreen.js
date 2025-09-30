import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // install: npm install @react-native-picker/picker

// Tää form screen pitäs saada vastaanottamaan movie id ja movie name -parametrit. Joten kun sitä käytetään se form tehää dynaamisesti.
export default function FormScreen() {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment) {
      Alert.alert("Error", "Please fill out both rating and comment.");
      return;
    }

    // Example: handle submission (replace with API call)
    // Tää pitää kattoo toimimaan dynaamisesti annetun movie id mukaan
    const reviewData = {
      movie: "680d29f98e8db1ede3dfa795", // movie id
      rating,
      comment,
    };

    console.log("Submitted review:", reviewData);
    Alert.alert("Success", "Your review has been submitted!");

    // Reset form
    setRating("");
    setComment("");
  };

  return (
    // Poista top, koska stack navigator lisää oman paddingin jo
    <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Tähän pitäs saada se elokuvan nimi */}
          <Text style={styles.title}>Write a review for{"\n"}Movie X</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Rating (1–5):</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={rating}
                onValueChange={(itemValue) => setRating(itemValue)}
                style={styles.picker}
                prompt="Select rating"
              >
                <Picker.Item label="Select rating" value="" />
                <Picker.Item label="⭐" value="1" />
                <Picker.Item label="⭐⭐" value="2" />
                <Picker.Item label="⭐⭐⭐" value="3" />
                <Picker.Item label="⭐⭐⭐⭐" value="4" />
                <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Comment:</Text>
            <TextInput
              style={styles.textarea}
              multiline
              numberOfLines={4}
              placeholder="Write your review..."
              value={comment}
              onChangeText={setComment}
            />
          </View>

          <View style={styles.formGroup}>
            <Button title="Submit Review" onPress={handleSubmit} color="#2D64AC" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "#E2E2E2",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2D64AC",
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
    height: 50,
    width: "100%",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top", // for Android multiline
  },
});
