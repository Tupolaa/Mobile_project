import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { getAllReviewsByMovie } from "./src/services/reviewsAPI";
import Header from "./src/components/Header";
import ReviewItem from "./src/components/ReviewItem";
import Navbar from "./src/components/Navbar";

export default function App() {
  const [reviews, setReviews] = useState([]);

  // joo
  const loadReviews = async () => {
    try {
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right", "bottom"]}>
        <Header title="Home" />

        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ReviewItem item={item} />}
        />

        <Navbar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
