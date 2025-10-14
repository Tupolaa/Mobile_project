import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import StyledButton from "../components/StyledButton";
import { AuthContext } from "../context/AuthContext";
import { FlatList } from "react-native-gesture-handler";
import ReviewCard from "../components/ReviewCard";
import { getAllReviewsByUser, deleteReviewById } from "../services/backendAPI";
import EditReviewModal from "../components/EditReviewModal";
import { fetchGenres } from "../services/backendAPI";
import { getUserGenres, saveUserGenre, removeUserGenre } from "../storage/genrePreferences";
import GenrePreferencesModal from "../components/GenrePreferencesModal";

// ProfileScreen
// Displays the logged-in user's profile including their reviews and genre preferences.
//
// Responsibilities:
// - If not authenticated, show navigation buttons to Login/Register
// - If authenticated, fetch and render the user's reviews
// - Provide actions to edit/delete reviews and to manage preferred genres

export default function ProfileScreen({ navigation }) {
  const { user, token, logout } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresModalVisible, setGenresModalVisible] = useState(false);

  // When a user is present (logged in), fetch their reviews and load genres & preferences
  useEffect(() => {
    if (user) {
      fetchReviews();
      loadGenresAndPreferences();
    }
  }, [user]);

  // Loads genres from backend and then loads the user's stored genre preferences locally
  const loadGenresAndPreferences = async () => {
    try {
      const fetched = await fetchGenres();
      setGenres(fetched);

      // getUserGenres reads the user's saved preferences (SQLite/local storage) and
      // calls setSelectedGenres with the result — this keeps the UI in sync with saved choices.
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

  // Fetches reviews for the current user from backendAPI
  const fetchReviews = async () => {
    try {
      const res = await getAllReviewsByUser(token, user.id);
      setReviews(res);
    } catch (error) {
      console.error(error);
    }
  };

  // Deletes a review both on the backend and locally from state
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewById(token, reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      handleRefresh(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  // Open the edit modal for a selected review
  const handleEditReview = (review) => {
    setSelectedReview(review);
    console.log("Editing review:", review._id);
    setIsModalVisible(true);
  };

  // Called by EditReviewModal after a successful update — merge the updated review into state
  const handleUpdateReview = (updatedReview) => {
    setReviews((prev) => prev.map((r) => (r._id === updatedReview._id ? updatedReview : r)));
  };

  // Simple initials for avatar (first letters of up to two name parts)
  // for example "John Doe" -> "JD", "Alice" -> "A"
  const initials = (user?.username || "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          {/* Improved not-logged-in UI: centered card with subtitle and two buttons */}
          <View style={styles.notLoggedContainer}>
            <View style={styles.notLoggedBox}>
              <Text style={styles.notLoggedTitle}>You are not logged in</Text>
              <Text style={styles.notLoggedSubtitle}>
                Sign in to view and manage your reviews and preferred genres.
              </Text>

              <View style={styles.notLoggedButtonsRow}>
                <StyledButton
                  title="Login"
                  onPress={() => navigation.navigate("Login")}
                  style={[styles.smallButton]}
                />
                <StyledButton
                  title="Register"
                  onPress={() => navigation.navigate("Register")}
                  style={[styles.smallButton, styles.secondaryButton]}
                />
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Profile header with avatar and meta info */}
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.meta}>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</Text>
            </View>
          </View>

          {/* Action row: compact buttons for common actions */}
          <View style={styles.actionRow}>
            <StyledButton
              title="Preferred Genres"
              onPress={() => setGenresModalVisible(true)}
              style={[styles.actionButton]}
              textStyle={styles.actionButtonText}
            />
            <StyledButton
              title="Logout"
              onPress={logout}
              style={[styles.actionButton, styles.logoutButton]}
              textStyle={styles.actionButtonText}
            />
          </View>
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={[reviews.length === 0 && styles.center, { flexGrow: 1 }]}
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ReviewCard review={item} onDelete={handleDeleteReview} onEdit={handleEditReview} />
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#E2E2E2" },
  text: { fontSize: 18, marginBottom: 20 },
  button: { width: 200, alignSelf: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  // Not-logged-in card styles
  notLoggedContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  notLoggedBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  notLoggedTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#333" },
  notLoggedSubtitle: { fontSize: 14, color: "#464646ff", textAlign: "center", marginBottom: 16 },
  notLoggedButtonsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  smallButton: { flex: 1, marginHorizontal: 6 },
  secondaryButton: { backgroundColor: "#808080ff" },
  // Logged-in profile styles
  profileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1b2a83ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 20 },
  userInfo: { flex: 1 },
  username: { fontSize: 18, fontWeight: "700", color: "#333" },
  meta: { color: "#666" },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  actionButton: { flex: 1, marginHorizontal: 6, paddingVertical: 10 },
  actionButtonText: { fontSize: 14 },
  logoutButton: { backgroundColor: "#c62828" },
});
