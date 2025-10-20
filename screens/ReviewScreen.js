/**
 * ReviewScreen.js
 *
 * Displays a list of reviews for a specific movie.
 * - Expects navigation parameters: { movieId, title }
 * - Fetches all reviews related to the given movie ID from the backend.
 * 
 * Dependencies:
 * - backendAPI: for fetching review data
 * - useBottomPadding: ensures list content doesn’t overlap with navbar
 * - ReviewItem: renders individual review cards
 */

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getAllReviews, getAllReviewsByMovie } from "../services/backendAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import ReviewItem from "../components/ReviewItem";
import useBottomPadding from "../hooks/useBottomPadding";
import { useRoute } from "@react-navigation/native";

export default function ReviewScreen() {
  const contentPadding = useBottomPadding();
  const [reviews, setReviews] = useState([]);
  const route = useRoute();

  /**
   * Fetches all reviews related to the movie passed via route params.
   * Uses `getAllReviewsByMovie(movieId)` from backend services.
   */
  const loadReviews = async () => {
    try {
      // get all testing
      //const rows = await getAllReviews();
      // get by movie id testing
      const movieId = route.params.movieId;
      const rows = await getAllReviewsByMovie(movieId);

      setReviews(rows);
    } catch (err) {
      console.error(err);
    }
  };

  // Load reviews once on mount
  useEffect(() => {
    loadReviews();
  }, []);

  return (
    /// “top” edge is omitted because Stack Navigator already adds top padding
    <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Display movie title and section heading */}
          <Text style={styles.title}>{route.params.title}{"\n"}Reviews</Text>
          {/* FlatList renders all fetched reviews */}
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ReviewItem item={item} />}
            contentContainerStyle={contentPadding}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "transparent",
    // debuggamista varten
    // backgroundColor: "#e31313ff",
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
    marginBottom: 15,
    color: "#2D64AC",
  },
});
