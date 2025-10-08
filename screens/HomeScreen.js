import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useBottomPadding from "../hooks/useBottomPadding";
import { AuthContext } from "../context/AuthContext";
import Carousel from "../components/Carousel";
import { getRandomRecommendations, getPersonalizedRecommendations } from "../services/backendAPI";
import { getUserGenres } from "../storage/genrePreferences";

export default function HomeScreen() {
  const contentPadding = useBottomPadding();
  const { user, token, loading } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState();

  // Run whenever user/token changes and after loading finishes
  useEffect(() => {
    if (!loading) {
      loadRecommendations();
    }
  }, [user, token, loading]);

  const loadRecommendations = async () => {
    try {
      console.log("--------------------------------------------");
      console.log("username:", username);
      console.log("user:", user);

      // if user is logged in
      if (user != null || user != undefined) {
        // Sit siihen päälle vielä se ehto et jos oli käyttäjä, preferenssit eli genret haetaan SQLiten tietokannasta
        // Genre IDs pitää olla arrayssa
        const genreIds = await getUserGenres(user.id);
        console.log("User preferred genres:", genreIds);
        const res = await getPersonalizedRecommendations(token, genreIds);
        setMovies(res || []);
        setUsername(user.username);
      }
      // if user is a guest
      else if (user == null || user == undefined || username == "Guest") {
        const res = await getRandomRecommendations();
        setMovies(res || []);
        setUsername("Guest");
      }
      console.log("--------------------------------------------");
    } catch (err) {
      console.error(err);
    }
  };

  // Loading state
  if (loading || username == null) {
    // Optional: show a loading spinner or placeholder
    return (
      <SafeAreaView style={styles.safearea} edges={["left", "right"]}>
        <View style={[styles.container, contentPadding, { justifyContent: "center", alignItems: "center" }]}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
    justifyContent: "flex-start",
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
