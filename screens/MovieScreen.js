import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import StyledButton from "../components/StyledButton";
import FormScreen from "./FormScreen";

export default function MovieScreen() {
  const route = useRoute();
  const { movie } = route.params;
  const navigation = useNavigation();

  const [formVisible, setFormVisible] = useState(false);
  const movieId = movie._id;
  const title = movie.title;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posters[0]}`;
  const { height } = Dimensions.get("window");

  const modalHeight = height * 0.5;
const slideAnim = useRef(new Animated.Value(modalHeight)).current;

const openModal = () => {
  setFormVisible(true);
  // Start hidden (translateY = modalHeight)
  slideAnim.setValue(modalHeight);
  Animated.timing(slideAnim, {
    toValue: 0, // slide up to position
    duration: 300,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  }).start();
};

const closeModal = () => {
  Animated.timing(slideAnim, {
    toValue: modalHeight, // slide back down
    duration: 250,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  }).start(() => setFormVisible(false));
};
console.log(movieId);
  console.log(title);
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

      <StyledButton
        title="View Reviews"
        onPress={() =>
          navigation.navigate("Review", { movieId: movie._id, title: movie.title })
        }
      />
      <StyledButton title="Add Review" onPress={openModal} />

      {/* MODAL */}
      <Modal transparent visible={formVisible} animationType="none">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={closeModal}
        />
        <Animated.View
  style={[
    styles.modalContent,
    { transform: [{ translateY: slideAnim }] },
  ]}
>
  <FormScreen
  movieId={movieId}
  title={title}
  onClose={closeModal}
/>
</Animated.View>
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
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50%", // half screen height
  backgroundColor: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
  transform: [{ translateY: 0 }], // base transform (so Animated modifies this)
},
});
