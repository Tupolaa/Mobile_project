import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getAllReviews, getAllReviewsByMovie } from "../services/reviewsAPI";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ReviewItem from "../components/ReviewItem";
import Navbar from "../components/Navbar";

export default function HomeScreen({ navigation }) {
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
    // Poista top, koska stack navigator lisää oman paddingin jo
    <SafeAreaView style={styles.safearea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Header title="Home" />

        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ReviewItem item={item} />}
        />

        {/* <Navbar /> */}
        {/* <Navbar navigation={navigation} /> */}
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
});
