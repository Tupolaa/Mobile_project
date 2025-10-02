import React, { use, useContext, useState, useEffect } from "react";
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

export default function ProfileScreen({ navigation }) {
  const { user, token, logout } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);

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
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      handleRefresh(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
    }
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
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={[reviews.length === 0 && styles.center, { flexGrow: 1 }]}
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ReviewCard review={item} onDelete={handleDeleteReview} />
            )}
            ListEmptyComponent={<Text>No reviews yet.</Text>}
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
