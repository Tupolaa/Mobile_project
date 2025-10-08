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
  const { user, token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  // if user is not logged in, username-variable is set to "Guest"
  const username = user?.username ?? "Guest";

  const loadRecommendations = async () => {
    try {
      // if user is a guest
      if (username == "Guest") {
        const res = await getRandomRecommendations();
        setMovies(res || []);
      }
      // if user is logged in as a registered user, so username is not null or undefined
      else if (user.username != null && user.username != undefined) {
        // Sit siihen päälle vielä se ehto et jos oli käyttäjä, preferenssit eli genret haetaan SQLiten tietokannasta
        // Genre IDs pitää olla arrayssa
        const genreIds = await getUserGenres(user.id);
        console.log("User preferred genres:", genreIds);
        const res = await getPersonalizedRecommendations(token, genreIds);
        setMovies(res || []);
      }
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
