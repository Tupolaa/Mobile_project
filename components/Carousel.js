/**
 * Carousel.js
 *
 * Displays a horizontally scrollable carousel of movie posters with a scaling animation.
 * Each movie card scales and fades smoothly as the user scrolls, and tapping a card
 * navigates to the "MovieScreen" with the selected movie data.
 *
 * Features:
 * - Animated scaling & opacity interpolation for smooth focus transitions.
 * - Spacer items on both sides to center the first and last movie.
 * - Uses TMDB poster URLs (w500 size) for images.
 *
 * Props:
 * @param {Array} movies - List of movie objects. Each should contain:
 *   - title {string}
 *   - posters {string[]} (array of image paths)
 *
 * Dependencies:
 * - react-navigation for screen navigation
 * - react-native Animated API for smooth transitions
 */
import React, { useRef } from "react";
import {
  View,
  Animated,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Screen dimensions
const { width } = Dimensions.get("window");
// Size constants for carousel layout
const ITEM_WIDTH = width * 0.65; // Width of each centered item
const SPACER_WIDTH = (width - ITEM_WIDTH) / 3; // Side padding to center items

export default function Carousel({ movies = [] }) {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        // Add spacer items on both ends to center the carousel
        data={[{ key: "spacer-left" }, ...movies, { key: "spacer-right" }]}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ alignItems: "center" }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          // Render invisible spacer views for centering
          if (!item || item.key?.includes("spacer")) {
            return <View style={{ width: SPACER_WIDTH }} />;
          }
          // Define animation input ranges based on scroll position
          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
          ];

          // Scale and opacity animations for the active item
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          const posterUrl = `https://image.tmdb.org/t/p/w500${item.posters?.[0]}`;

          return (
            <View style={{ width: ITEM_WIDTH, alignItems: "center" }}>
              <Animated.View
                style={[
                  styles.movieCard,
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("MovieScreen", { movie: item })}
                >
                  {/* Poster image or placeholder text */}
                  {posterUrl ? (
                    <Image
                      source={{ uri: posterUrl }}
                      style={styles.moviePoster}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.noPosterText}>No poster found</Text>
                  )}
                  {/* Movie title */}
                  <Text style={styles.movieTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    // backgroundColor: "#e31313ff",
  },

  movieCard: {
    backgroundColor: "#90bcf5",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  moviePoster: {
    width: ITEM_WIDTH * 0.9,
    height: ITEM_WIDTH * 1.3,
    borderRadius: 20,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  noPosterText: {
    color: "#333",
    textAlign: "center",
  },
});
