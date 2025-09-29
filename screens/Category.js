import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  Image,
} from "react-native";
import { BACKEND_URL } from "@env";

export default function GenreScreen() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // load genres on first render
  useEffect(() => {
  const fetchGenres = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/genres`);
      const data = await res.json();
      setGenres(data);
    } catch (err) {
      console.error("Fetch genres error:", err);
    }
  };

  fetchGenres();
}, []);

const handlePress = async (name) => {
  try {
    setSelectedGenre(name);
    setModalVisible(true);

    const res = await fetch(`${BACKEND_URL}/category/${encodeURIComponent(name)}`);
    const data = await res.json();
    setMovies(data);
  } catch (err) {
    console.error("Fetch movies error:", err);
  }
};

  return (
    <View style={styles.container}>
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

      {/* Movies modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <Text style={styles.subHeading}>{selectedGenre} Movies</Text>

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

  {item.posters?.length > 0 && (
    <Image
      style={styles.moviePoster}
      source={{
        uri: `https://image.tmdb.org/t/p/original${
          item.posters[Math.floor(Math.random() * item.posters.length)]
        }`,
      }}
    />
  )}
</View>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  heading: { fontSize: 22, marginBottom: 16, fontWeight: "bold" },
  subHeading: { fontSize: 18, marginVertical: 10, fontWeight: "600" },
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
  moviePoster: { width: 100, height: 150, marginTop: 8, borderRadius: 4 },
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
