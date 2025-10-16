import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  getUserGenres,
  saveUserGenre,
  removeUserGenre,
} from "../storage/genrePreferences";

// GenrePreferencesModal
// Modal UI that allows a user to select/deselect favorite genres.
//
// Props:
// - visible (bool): show/hide the modal
// - onClose (func): called when modal closes (after saving)
// - userId (string): id of the current user (used for DB operations)
// - genres (array): list of genre objects from backend: { id, name }
//
// Behaviour:
// - Loads saved genre ids for the user when opened
// - Lets the user toggle selections locally
// - On Save, computes a diff versus the persisted selection and calls
//   `saveUserGenre` / `removeUserGenre` for the differences only
export default function GenrePreferencesModal({
  visible,
  onClose,
  userId,
  genres,
}) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Load current user preferences when modal opens
  useEffect(() => {
    if (visible && userId) {
      (async () => {
        try {
          // getUserGenres returns an array of genre_id numbers
          const saved = await getUserGenres(userId);
          setSelectedGenres(saved || []);
        } catch (err) {
          console.error("Failed to load user genres:", err);
        }
      })();
    }
  }, [visible, userId]);

  // Toggle selection locally (does not write to DB yet)
  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  // When the user presses Save & Close, compute the minimal changes required
  // and persist them. This avoids wiping and re-inserting the entire preference
  // set and makes it easier to track additions/removals.
  const handleClose = async () => {
    try {
      console.log("Saving selected genres:", selectedGenres);

      const currentGenres = await getUserGenres(userId);

      // Remove genres that were deselected
      for (const id of currentGenres) {
        if (!selectedGenres.includes(id)) {
          await removeUserGenre(userId, id);
          console.log("Removed genre:", id);
        }
      }

      // Add newly selected genres
      for (const id of selectedGenres) {
        if (!currentGenres.includes(id)) {
          await saveUserGenre(userId, id);
          console.log("Saved genre:", id);
        }
      }

      onClose();
    } catch (err) {
      console.error("Failed to save user genres:", err);
      onClose(); // still close modal
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>Select Your Favorite Genres</Text>
          <ScrollView contentContainerStyle={styles.genreGrid}>
            {genres.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[
                  styles.genreButton,
                  selectedGenres.includes(g.id) && styles.genreButtonSelected,
                ]}
                onPress={() => toggleGenre(g.id)}
              >
                <Text
                  style={[
                    styles.genreText,
                    selectedGenres.includes(g.id) && styles.genreTextSelected,
                  ]}
                >
                  {g.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Save & Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  genreButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 6,
  },
  genreButtonSelected: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
  genreText: { color: "#555" },
  genreTextSelected: { color: "#fff" },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold" },
});
