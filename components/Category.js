

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { BACKEND_URL } from '@env';


export default function GenreScreen() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // load genres on first render
  useEffect(() => {
    fetch(`${BACKEND_URL}/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Fetch genres error:", err));
  }, []);

  const handlePress = (name) => {
    setSelectedGenre(name);
    fetch(`${BACKEND_URL}/category/${encodeURIComponent(name)}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Fetch movies error:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Choose a Genre</Text>

      {/* Genre buttons */}
      <View style={styles.buttonWrap}>
        {genres.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={styles.button}
            onPress={() => handlePress(g.name)}
          >
            <Text style={styles.buttonText}>{g.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Movies output */}
      {selectedGenre && (
        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={styles.subHeading}>
            {selectedGenre} Movies:
          </Text>
          {movies.length === 0 ? (
            <Text>No movies found.</Text>
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.movieCard}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Text style={styles.movieDate}>{item.release_date}</Text>
                  <Text numberOfLines={3} style={styles.movieOverview}>
                    {item.overview}
                  </Text>
                  <Text style={styles.moviePoster}>{item.posters[0]}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  heading: { fontSize: 22, marginBottom: 16, fontWeight: "bold" },
  subHeading: { fontSize: 18, marginBottom: 10, fontWeight: "600" },
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 6,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  movieCard: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  movieTitle: { fontSize: 16, fontWeight: "bold" },
  movieDate: { fontSize: 14, color: "#666" },
  movieOverview: { marginTop: 4, fontSize: 14 },
});
