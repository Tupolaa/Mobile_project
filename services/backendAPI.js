import { BACKEND_URL } from "@env";

/**
 * GET - read all reviews from the backend.
 * 
 * @async
 * @function getAllReviews
 * @returns {Promise<Array>} A list of all review objects.
 * @throws {Error} If the request fails or the response is invalid.
 */
export const getAllReviews = async () => {
  try {
    console.log("[getAllReviews] 🔧 Fetching...");
    const res = await fetch(`${BACKEND_URL}/review`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getAllReviews] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getAllReviews] ❌ Error:", err);
    throw err;
  }
};

/**
 * GET - read all reviews by movie ID.
 * 
 * @async
 * @function getAllReviewsByMovie
 * @param {string} id - The MongoDB movie ID.
 * @returns {Promise<Array>} A list of reviews for the given movie.
 * @throws {Error} If no ID is provided or the request fails.
 */
export const getAllReviewsByMovie = async (id) => {
  if (!id) throw new Error("No id provided!");
  try {
    console.log("[getAllReviewsByMovie] 🔧 Fetching...", { id });
    const res = await fetch(`${BACKEND_URL}/review/movie/${id}`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getAllReviewsByMovie] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getAllReviewsByMovie] ❌ Error:", err);
    throw err;
  }
};


/**
 * GET - read all reviews by user ID.
 * 
 * @async
 * @function getAllReviewsByUser
 * @param {string} token - The user's authentication token.
 * @param {string} id - The MongoDB user ID.
 * @returns {Promise<Array>} A list of the user's reviews.
 * @throws {Error} If the token or ID is missing, or the request fails.
 */
export const getAllReviewsByUser = async (token, id) => {
  if (!token) throw new Error("No token provided!");
  if (!id) throw new Error("No id provided!");

  try {
    console.log("[getAllReviewsByUser] 🔧 Fetching...", { id });
    const res = await fetch(`${BACKEND_URL}/review/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getAllReviewsByUser] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getAllReviewsByUser] ❌ Error:", err);
    throw err;
  }
};


/**
 * POST - create a new review for movie.
 * 
 * @async
 * @function createReview
 * @param {string} token - The user's authentication token.
 * @param {Object} reviewData - The review details.
 * @param {string} reviewData.user - The user ID.
 * @param {string} reviewData.movie - The movie ID.
 * @param {number} reviewData.rating - The user's rating for the movie.
 * @param {string} [reviewData.comment] - Optional text comment.
 * @returns {Promise<Object>} The newly created review object.
 * @throws {Error} If required data is missing or the request fails.
 */
export const createReview = async (token, reviewData) => {
  if (!token) throw new Error("No token provided!");
  console.log(reviewData.rating);
  console.log(reviewData.movie);
  console.log(reviewData.comment);
  console.log(reviewData.user);
  if (!reviewData || !reviewData.movie || !reviewData.rating) {
    throw new Error("Missing required review data!");
  }

  try {
    console.log("[createReview] 🔧 Creating...", reviewData);
    const res = await fetch(`${BACKEND_URL}/review/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-From": "mobile",
      },
      body: JSON.stringify(reviewData),
    });
    console.log(res);
    if (!res.ok) throw new Error(`Failed to create: ${res.status}`);

    const json = await res.json();
    console.log("[createReview] ✅ Created:", json.data._id);
    return json.data;
  } catch (err) {
    console.error("[createReview] ❌ Error:", err);
    throw err;
  }
};

/**
 * DELETE - removes a review by it's ID.
 * 
 * @async
 * @function deleteReviewById
 * @param {string} token - The user's authentication token.
 * @param {string} id - The MongoDB review ID.
 * @returns {Promise<Object>} The deleted review object.
 * @throws {Error} If the token or ID is missing, or the request fails.
 */
export const deleteReviewById = async (token, id) => {
  if (!token) throw new Error("No token provided!");
  if (!id) throw new Error("No review ID provided!");

  try {
    console.log("[deleteReviewById] 🔧 Deleting...", { id });
    const res = await fetch(`${BACKEND_URL}/review/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Requested-From": "mobile",
      },
    });

    if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);

    const json = await res.json();
    console.log("[deleteReviewById] ✅ Deleted:", json.data._id);
    return json.data;
  } catch (err) {
    console.error("[deleteReviewById] ❌ Error:", err);
    throw err;
  }
};

/**
 * PATCH - Updates an existing review by ID.
 * 
 * @async
 * @function updateReviewById
 * @param {string} token - The user's authentication token.
 * @param {string} id - The MongoDB review ID.
 * @param {Object} reviewData - The updated review details.
 * @param {number} [reviewData.rating] - Updated rating value.
 * @param {string} [reviewData.comment] - Updated comment text.
 * @returns {Promise<Object>} The updated review object.
 * @throws {Error} If required parameters are missing or the request fails.
 */
export const updateReviewById = async (token, id, reviewData) => {
  if (!token) throw new Error("No token provided!");
  if (!id) throw new Error("No review ID provided!");
  if (!reviewData) throw new Error("No review data provided!");

  try {
    console.log("[updateReviewById] 🔧 Updating...", { id, reviewData });
    const res = await fetch(`${BACKEND_URL}/review/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-From": "mobile",
      },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) throw new Error(`Failed to update: ${res.status}`);

    const json = await res.json();
    console.log("[updateReviewById] ✅ Updated:", json.data._id);
    return json.data;
  } catch (err) {
    console.error("[updateReviewById] ❌ Error:", err);
  }
};


/**
 * GET - Fetches 10 random recommended movies.
 * 
 * @async
 * @function getRandomRecommendations
 * @returns {Promise<Array>} A list of recommended movie objects.
 * @throws {Error} If the request fails.
 */
export const getRandomRecommendations = async () => {
  try {
    console.log("[getRandomRecommendations] 🔧 Fetching...");
    const res = await fetch(`${BACKEND_URL}/recommended`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getRandomRecommendations] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getRandomRecommendations] ❌ Error:", err);
    throw err;
  }
};

// testing: http://localhost:5000/recommended/user/?genreIds=27
/**
 * GET - Fetches personalized movie recommendations for a user, 
 * optionally filtered by genre IDs, and is sorted by avg rating from best to worst.
 * 
 * @async
 * @function getPersonalizedRecommendations
 * @param {string} token - The user's authentication token.
 * @param {Array<number>} [genreIds=[]] - Optional array of genre IDs from the local database.
 * @returns {Promise<Array>} A list of recommended movie objects.
 * @throws {Error} If the token is missing or the request fails.
 * 
 * @example
 * const genreIds = await getUserGenres(user.id);
 * const recommendations = await getPersonalizedRecommendations(token, genreIds);
 */
export const getPersonalizedRecommendations = async (token, genreIds = []) => {
  if (!token) throw new Error("No token provided!");

  try {
    // Build query string (?genreIds=27&genreIds=28)
    const query = genreIds.map((id) => `genreIds=${id}`).join("&");
    const url = `${BACKEND_URL}/recommended/user/${query ? `?${query}` : ""}`;

    console.log("[getPersonalizedRecommendations] 🔧 Fetching:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getPersonalizedRecommendations] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getPersonalizedRecommendations] ❌ Error:", err);
    throw err;
  }
};

/**
 * Fetches all movie genres from the backend.
 * 
 * @async
 * @function fetchGenres
 * @returns {Promise<Array>} A list of genre objects.
 * @throws {Error} If the request fails.
 */
export const fetchGenres = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/genres`);
    const data = await res.json();

    return data; // Return the fetched genres
  } catch (err) {
    console.error("Fetch genres error:", err);
    throw err;
  }
};

/**
 * Fetches all movies from the backend.
 * 
 * @async
 * @function fetchMovies
 * @returns {Promise<Array>} A list of movie objects.
 * @throws {Error} If the request fails.
 */
export const fetchMovies = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies`);
    const data = await res.json();

    return data; // Return the fetched movies
  } catch (err) {
    console.error("Fetch movies error:", err);
    throw err;
  }
};