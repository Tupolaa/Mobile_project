import React, { useContext, useState, useEffect } from "react";
import { View, Button, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { getAllReviewsByUser } from "../services/backendAPI";
import ReviewItem from "../components/ReviewItem";
import useBottomPadding from "../hooks/useBottomPadding";

export default function TestScreen({ navigation }) {
  const contentPadding = useBottomPadding();
  const { token, user, logout } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    if (!token) {
      setResponse("No token found!");
      return;
    }
    try {
      // get all testing
      const rows = await getAllReviewsByUser(token, user.id);
      // get by movie id testing
      // const movieId = "680d29f98e8db1ede3dfa796";
      // const rows = await getAllReviewsByMovie(movieId);

      setReviews(rows);
    } catch (err) {
      console.error(err);
      setReviews(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <View>
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
      <Button title="Get My Reviews" onPress={loadReviews} />
      <Button title="Logout" onPress={logout} color="red" />

      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ReviewItem item={item} />}
        contentContainerStyle={contentPadding}
      />
    </View>
  );
}
