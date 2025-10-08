import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, Image, StyleSheet, Text } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Carousel({ movies }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

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
            <View style={styles.movieCard}>
              {posterUrl && <Image source={{ uri: posterUrl }} style={styles.moviePoster} resizeMode="cover" />}
              <Text style={styles.movieTitle} numberOfLines={2}>
                {item.title}
              </Text>
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
  },

  movieCard: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
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
