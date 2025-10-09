import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

export default function Carousel({ movies }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Image carousel */}
      <FlatList
        data={movies}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        renderItem={({ item }) => {
          const posterUrl = `https://image.tmdb.org/t/p/w500${item.posters[0]}`;

          return (
            <TouchableOpacity
              style={styles.movieCard}
              onPress={() => navigation.navigate("MovieScreen", { movie: item })}
            >
              <View>
                {posterUrl ? (
                  <Image source={{ uri: posterUrl }} style={styles.moviePoster} resizeMode="cover" />
                ) : (
                  <Text style={styles.noPosterText}>No poster found</Text>
                )}
                <Text style={styles.movieTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  movieCard: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#90bcf5ff",
    borderRadius: 6,
    padding: 6,
  },
  moviePoster: {
    width: 200,
    height: 350,
    borderRadius: 6,
    marginBottom: 6,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
