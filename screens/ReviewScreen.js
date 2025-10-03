import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getAllReviews, getAllReviewsByMovie } from "../services/backendAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import ReviewItem from "../components/ReviewItem";
import useBottomPadding from "../hooks/useBottomPadding";
import { useRoute } from "@react-navigation/native";

// Review screen pitäs saada vastaanottamaan joko (elokuva id + elokuva nimi) tai user id
export default function ReviewScreen() {
  const contentPadding = useBottomPadding();
  const [reviews, setReviews] = useState([]);
  const route = useRoute();

  // joo
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

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    // Poista top, koska stack navigator lisää oman paddingin jo
    <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Tähän pitäs saada se elokuvan nimi */}
          <Text style={styles.title}>Movie X{"\n"}Reviews</Text>
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
