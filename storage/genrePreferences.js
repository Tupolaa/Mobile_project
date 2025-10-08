import * as SQLite from "expo-sqlite";

// Keep one shared database connection
let dbPromise = null;

// Always reuse this single DB instance
const getDb = async () => {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("movies.db");
    const db = await dbPromise;
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
export const getUserGenres = async (userId) => {
  const db = await getDb();
  const result = await db.getAllAsync(
    "SELECT genre_id FROM user_genre_preferences WHERE user_id = ?;",
    [userId]
  );
  return result.map((r) => r.genre_id);
};

// Save a genre
export const saveUserGenre = async (userId, genreId) => {
  const db = await getDb();
  const stmt = await db.prepareAsync(
    "INSERT INTO user_genre_preferences (user_id, genre_id) VALUES (?, ?);"
  );
  await stmt.executeAsync([userId, genreId]);
  await stmt.finalizeAsync();
  console.log(`✅ Saved genre ${genreId} for user ${userId}`);
};

// Remove a genre
export const removeUserGenre = async (userId, genreId) => {
  const db = await getDb();
  const stmt = await db.prepareAsync(
    "DELETE FROM user_genre_preferences WHERE user_id = ? AND genre_id = ?;"
  );
  await stmt.executeAsync([userId, genreId]);
  await stmt.finalizeAsync();
  console.log(`🗑️ Removed genre ${genreId} for user ${userId}`);
};
