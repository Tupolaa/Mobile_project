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

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.65; // center item width
const SPACER_WIDTH = (width - ITEM_WIDTH) / 3; // side spacing

export default function Carousel({ movies = [] }) {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
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
          if (!item || item.key?.includes("spacer")) {
            return <View style={{ width: SPACER_WIDTH }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_WIDTH,
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
          ];

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
                  {posterUrl ? (
                    <Image
                      source={{ uri: posterUrl }}
                      style={styles.moviePoster}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.noPosterText}>No poster found</Text>
                  )}
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
