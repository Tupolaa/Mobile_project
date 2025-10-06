        import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, } from "react-native";
import { useRoute } from "@react-navigation/native";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import FormScreen from "./FormScreen";

export default function MovieScreen() {
  const route = useRoute();
  const { movie } = route.params; 
  const navigation = useNavigation();
  const [formVisible, setFormVisible] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posters[0]}`;

  
 //console.log(movie);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posterUrl && (
        <Image source={{ uri: posterUrl }} style={styles.poster} />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.details}>
        Release Date: {movie.release_date || "N/A"}
      </Text>
      <Text style={styles.details}>
        Genre: {movie.genre_names.join(", ") || "N/A"}
      </Text>
      <StyledButton title="View Reviews" onPress={() => navigation.navigate("Review", { movieId: movie._id, title: movie.title })} />
      <StyledButton title="Add Review" onPress={() => setFormVisible(true)} />
     <Modal
        visible={formVisible}
        animationType="slide"
        onRequestClose={() => setFormVisible(false)}
      >
        {/* Pass movie info as props */}
        <FormScreen
          movieId={movieId}
          title={title}
          onClose={() => setFormVisible(false)}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
});
