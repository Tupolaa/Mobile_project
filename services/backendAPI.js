import { BACKEND_URL } from "@env";

// GET - all reviews
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

// GET - all reviews by movie ID
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

// GET - all reviews by user ID
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

// POST - create a new review
export const createReview = async (token, reviewData) => {
  if (!token) throw new Error("No token provided!");
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

// DELETE - remove a review by ID
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
 // Fetching genres
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
// Fetching movies
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
