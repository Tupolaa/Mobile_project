import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";

export default function App() {
  const [reviews, setReviews] = useState([]);

  const ENDPOINT = "/review";

  // PUBLIC testing on Real Devices: https://moviereview-472307.lm.r.appspot.com/ENDPOINTS
  const API_URL = "https://moviereview-472307.lm.r.appspot.com";

  // LOCAL testing on Real Devices: replace with your PC's local IP (e.g. http://192.168.1.100:PORT/ENDPOINTS)
  // const API_URL = "http://192.168.1.106:5000";

  // LOCAL testing on Android Emulators: use use 10.0.2.2. You also need CORS in server code.
  // const API_URL = "http://10.0.2.2:5000";

  const fetchReviews = async () => {
    try {
      const res = await fetch(API_URL + ENDPOINT);
      const json = await res.json();
      console.log("Request succesful and response received!");
      setReviews(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Reviews</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "bold" }}>{item.user.username}</Text>
            <Text>{item.movie.title}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
