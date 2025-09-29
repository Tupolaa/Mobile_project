import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { getAllReviews, getAllReviewsByMovie } from "./src/services/reviewsAPI";
import Header from "./src/components/Header";
import ReviewItem from "./src/components/ReviewItem";
import Navbar from "./src/components/Navbar";

export default function App() {
  const [reviews, setReviews] = useState([]);

  // joo
  const loadReviews = async () => {
    try {
      // get all testing
      const rows = await getAllReviews();
      // get by movie id testing
      // const movieId = "680d29f98e8db1ede3dfa796";
      // const rows = await getAllReviewsByMovie(movieId);

      setReviews(rows);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

return (

    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <SafeAreaProvider>
        <SafeAreaView style={styles.safearea} edges={["top", "left", "right", "bottom"]}>
          <View style={styles.container}>
            <Header title="Home" />

            <FlatList
              data={reviews}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <ReviewItem item={item} />}
            />

            <Navbar />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
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
});