import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { BACKEND_URL } from "@env";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  'React keys must be passed directly to JSX'
]);
export default function GenreScreen() {
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [search, setSearch] = useState("");

  // load genres + all movies on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/genres`);
        const data = await res.json();
        setGenres(data);
      } catch (err) {
        console.error("Fetch genres error:", err);
      }
    };

    const fetchMovies = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/movies`);
        const data = await res.json();
        setAllMovies(data);
        setFilteredMovies(data); 
      } catch (err) {
        console.error("Fetch movies error:", err);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);

 
  const handlePress = (name) => {
    setSelectedGenre(name);
    setSearch("");

   
    const filtered = allMovies.filter((movie) => {
      const genreNames = movie.genre_names || []; 
      return genreNames.includes(name);
    });

    setFilteredMovies(filtered);
  };

  
  const updateSearch = (text) => {
    setSearch(text);

    const baseList =
      selectedGenre === null
        ? allMovies
        : allMovies.filter((movie) =>
            (movie.genre_names || []).includes(selectedGenre)
          );

    const searched = baseList.filter((m) =>
      m.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredMovies(searched);
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.heading}>Choose a Genre</Text>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
        placeholder="Search movies..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
      />
      <View style={styles.buttonWrap}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGenre === null && styles.activeButton,
          ]}
          onPress={() => {
            setSelectedGenre(null);
            setSearch("");
            setFilteredMovies(allMovies); 
          }}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        {genres.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={[
              styles.button,
              selectedGenre === g.name && styles.activeButton,
            ]}
            onPress={() => handlePress(g.name)}
          >
            <Text style={styles.buttonText}>{g.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subHeading}>
        {selectedGenre ? `${selectedGenre} Movies` : "All Movies"}
      </Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={filteredMovies}
      keyExtractor={(item) => item._id}
      numColumns={3}
      columnWrapperStyle={styles.row}
      ListEmptyComponent={
      <Text style={styles.noMovies}>No movies found.</Text>
    }
      renderItem={({ item }) => {
        const posterUrl = `https://image.tmdb.org/t/p/w500${item.posters[0]}`;

        return (
          <View style={styles.movieCard}>
            {posterUrl && (
              <Image
                source={{ uri: posterUrl }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
            )}
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, 
  marginBottom: 16,
  fontWeight: "bold"
},
  subHeading: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "600",
    textAlign: "center"
  },
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  noMovies: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 6,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  row: { justifyContent: "space-between" },
  movieCard: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    padding: 6,
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginBottom: 6
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  searchBarInput: { backgroundColor: "#eee", borderRadius: 20 },
  searchBarContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
