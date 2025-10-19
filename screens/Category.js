// Import necessary React, React Native, and navigation modules
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { LogBox } from "react-native";
import { fetchMovies, fetchGenres } from "../services/backendAPI";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Ignore React warning messages in console
LogBox.ignoreLogs(["React keys must be passed directly to JSX"]);

export default function GenreScreen() {
  // State variables
  const [genres, setGenres] = useState([]);           
  const [allMovies, setAllMovies] = useState([]);       
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [formVisible, setFormVisible] = useState(false); 
  const [search, setSearch] = useState("");            
  const navigation = useNavigation();                    

  // Fetch genres and movies when the screen first loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, moviesData] = await Promise.all([
          fetchGenres(),
          fetchMovies(),
        ]);
        setGenres(genresData);
        setAllMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (err) {
        console.error("Fetch data error:", err);
      }
    };
    fetchData();
  }, []);

  // Recalculate movie list whenever search or selected genre changes
  useEffect(() => {
    const baseList =
      selectedGenre === null
        ? allMovies
        : allMovies.filter((movie) =>
            (movie.genre_names || []).includes(selectedGenre)
          );

    const searched = baseList.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMovies(searched);
  }, [search, selectedGenre, allMovies]);

  // Handle selecting a genre from the modal
  const handlePress = (name) => {
    setSelectedGenre(name);
    setSearch("");
    closeModal();
  };

  // Open / close modal
  const openModal = () => setFormVisible(true);
  const closeModal = () => setFormVisible(false);

  // Render header (search bar + genre selector)
  const renderHeader = () => (
    <View>
      {/* Search bar */}
      <View style={[styles.searchBarContainer, styles.searchBarInput]}>
        <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={() => setSearch(search)}
          returnKeyType="search"
        />
      </View>

      {/* Genre selection text (opens modal) */}
      <Text style={styles.heading} onPress={openModal}>
        Choose a Genre
      </Text>

      {/* Modal with genre buttons */}
      <Modal transparent visible={formVisible} animationType="none">
        {/* Backdrop (closes modal when tapped outside) */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalView}
          onPress={closeModal}
        >
          {/* Actual modal box */}
          <View style={styles.modalContainer}>
            <View style={styles.buttonWrap}>
              {/* "All" button resets filters */}
              <TouchableOpacity
                style={[styles.button, selectedGenre === null && styles.activeButton]}
                onPress={() => {
                  setSelectedGenre(null);
                  setSearch("");
                  setFilteredMovies(allMovies);
                  closeModal();
                }}
              >
                <Text style={styles.buttonText}>All</Text>
              </TouchableOpacity>

              {/* Dynamically render buttons for each genre */}
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
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Show current selected genre */}
      <Text style={styles.subHeading}>
        {selectedGenre ? `${selectedGenre} Movies` : "All Movies"}
      </Text>
    </View>
  );

  // Main component render
  return (
    <View style={styles.container}>
      {renderHeader()}

      {/* FlatList displays movie posters */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.noMovies}>No movies found.</Text>}
        renderItem={({ item }) => {
          // Construct movie poster URL
          const posterUrl = item.posters?.[0]
            ? `https://image.tmdb.org/t/p/w500${item.posters[0]}`
            : null;

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieScreen", { movie: item })}
            >
              <View style={styles.movieCard}>
                {/* Movie poster or fallback text */}
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
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
  },
  heading: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 5,
  },
  subHeading: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    alignSelf: "center",
  },
  noMovies: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 5,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 4,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
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
    width: 100,
    height: 150,
    borderRadius: 6,
    marginBottom: 6,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16,
    maxWidth: 100,
  },
  noPosterText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 50, 
    width: 100,
    height: 150,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  searchBarContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 10,
  },
});
