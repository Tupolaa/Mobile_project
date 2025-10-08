import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import StyledButton from "../components/StyledButton";
import { AuthContext } from "../context/AuthContext";
import { FlatList } from "react-native-gesture-handler";
import ReviewCard from "../components/ReviewCard";
import { getAllReviewsByUser, deleteReviewById } from "../services/backendAPI";
import EditReviewModal from "../components/EditReviewModal";
import { fetchGenres } from "../services/backendAPI";
import {
  getUserGenres,
  saveUserGenre,
  removeUserGenre,
} from "../storage/genrePreferences";
import GenrePreferencesModal from "../components/GenrePreferencesModal";

export default function ProfileScreen({ navigation }) {
  const { user, token, logout } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresModalVisible, setGenresModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      fetchReviews();
      loadGenresAndPreferences();
    }
  }, [user]);

  // Loads genres and user preferences from SQLite database locally
  const loadGenresAndPreferences = async () => {
    try {
      const fetched = await fetchGenres();
      setGenres(fetched);

      if (user?.id) {
        getUserGenres(user.id, setSelectedGenres);
      }
    } catch (err) {
      console.error("Error loading genres or preferences:", err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReviews();
    setRefreshing(false);
  };

  const fetchReviews = async () => {
    try {
      const res = await getAllReviewsByUser(token, user.id);
      setReviews(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewById(token, reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      handleRefresh(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    console.log("Editing review:", review._id);
    setIsModalVisible(true);
  };

  const handleUpdateReview = (updatedReview) => {
    setReviews((prev) =>
      prev.map((r) => (r._id === updatedReview._id ? updatedReview : r))
    );
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Text style={styles.text}>You are not logged in.</Text>
          <StyledButton
            title="Go to Login"
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          />
          <StyledButton
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Welcome, {user.username}!</Text>
          <StyledButton
            title="Select Preferred Genres"
            onPress={() => setGenresModalVisible(true)}
            style={styles.button}
          />
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={[
              reviews.length === 0 && styles.center,
              { flexGrow: 1 },
            ]}
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ReviewCard
                review={item}
                onDelete={handleDeleteReview}
                onEdit={handleEditReview}
              />
            )}
            ListEmptyComponent={<Text>No reviews yet.</Text>}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
          <EditReviewModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            review={selectedReview}
            token={token}
            onUpdate={handleUpdateReview}
          />
          <GenrePreferencesModal
            visible={genresModalVisible}
            onClose={() => setGenresModalVisible(false)}
            userId={user.id}
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <StyledButton title="Logout" onPress={logout} style={styles.button} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 18, marginBottom: 20 },
  button: { width: 200, alignSelf: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
