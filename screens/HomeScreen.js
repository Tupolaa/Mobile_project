import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useBottomPadding from "../hooks/useBottomPadding";
import { AuthContext } from "../context/AuthContext";
import Carousel from "../components/Carousel";
import { getRandomRecommendations, getPersonalizedRecommendations } from "../services/backendAPI";

export default function HomeScreen() {
  const contentPadding = useBottomPadding();
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  const username = user?.username ?? "Guest";

  // const data = await getPersonalizedRecommendations(token); // no genreIds

  // Tähän vielä se ehtoilu et jos on käyttäjä ladataan personoidut suositukset, jos ei eli guest niin random suositukset
  const loadRecommendations = async () => {
    try {
      const res = await getRandomRecommendations();
      setMovies(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  return (
    // Poista top, koska stack navigator lisää oman paddingin jo
    <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
      <View style={[styles.container, contentPadding]}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome, {username}</Text>

          <Text style={styles.paragraph}>
            Here, you can browse the list of films,{"\n"}
            read reviews by other users,{"\n"}
            and—<Text style={styles.bold}>if you'd like to share your own</Text>—register and log in!
          </Text>
          {/* In here i need to send the movies */}
          <Carousel movies={movies} />
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
    alignContent: "center",
    justifyContent: "center",
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
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#424242",
  },
  bold: {
    fontWeight: "bold",
  },
});
