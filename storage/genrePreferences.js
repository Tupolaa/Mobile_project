import * as SQLite from "expo-sqlite";

// storage/genrePreferences.js
// Small local persistence layer for storing users' preferred genres using SQLite.
//
// Notes:
// - This module keeps a single shared DB connection (via `dbPromise`) and exposes
//   small async helpers used elsewhere in the app.
// - The code expects an async-friendly SQLite wrapper providing `openDatabaseAsync`,
//   `execAsync`, `getAllAsync`, `prepareAsync`, `executeAsync`, and `finalizeAsync`.
//   If you swap SQLite implementations you may need to adapt these calls.

// Keep one shared database connection
let dbPromise = null;

// Always reuse this single DB instance. Creates the table on first open.
const getDb = async () => {
  if (!dbPromise) {
    // Open (or create) a database file named movies.db
    dbPromise = SQLite.openDatabaseAsync("movies.db");
    const db = await dbPromise;

    // Ensure the table exists. Columns:
    // - id: internal primary key
    // - user_id: string identifier for the user (matches decoded token id)
    // - genre_id: numeric id of the genre (as returned by backend `fetchGenres`)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_genre_preferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        genre_id INTEGER NOT NULL
      );
    `);
  }
  return dbPromise;
};

// Get all selected genres for a user
// Returns an array of genre_id numbers, e.g. [12, 5, 7]
export const getUserGenres = async (userId) => {
  const db = await getDb();
  const result = await db.getAllAsync(
    "SELECT genre_id FROM user_genre_preferences WHERE user_id = ?;",
    [userId]
  );

  // Map the rows to a flat array of numeric genre ids
  return result.map((r) => r.genre_id);
};

// Save a genre preference for a user
// Inserts a (user_id, genre_id) row. Callers should ensure duplicates are handled
// at the UI layer 
export const saveUserGenre = async (userId, genreId) => {
  const db = await getDb();
  const stmt = await db.prepareAsync(
    "INSERT INTO user_genre_preferences (user_id, genre_id) VALUES (?, ?);"
  );
  await stmt.executeAsync([userId, genreId]);
  await stmt.finalizeAsync();
  console.log(`✅ Saved genre ${genreId} for user ${userId}`);
};

// Remove a saved genre preference for a user
export const removeUserGenre = async (userId, genreId) => {
  const db = await getDb();
  const stmt = await db.prepareAsync(
    "DELETE FROM user_genre_preferences WHERE user_id = ? AND genre_id = ?;"
  );
  await stmt.executeAsync([userId, genreId]);
  await stmt.finalizeAsync();
  console.log(`🗑️ Removed genre ${genreId} for user ${userId}`);
};
