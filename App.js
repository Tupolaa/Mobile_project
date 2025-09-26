import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, View } from "react-native";
import { getAllReviews, getAllReviewsByMovie } from "./src/services/reviewsAPI";
import Header from "./src/components/Header";
import ReviewItem from "./src/components/ReviewItem";

export default function App() {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      // const rows = await getAllReviews();
      // Minecraft movie
      const movieId = "680d29f98e8db1ede3dfa796";
      const rows = await getAllReviewsByMovie(movieId);
      setReviews(rows);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />

      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ReviewItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
});
