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

// PATCH - update a review by ID
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

// GET - 10 random recommendations
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
//  GET - personalized recommendations by prefered genre IDs and sorted by avg rating from best to worst
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
