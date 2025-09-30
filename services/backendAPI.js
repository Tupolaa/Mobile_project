import { BACKEND_URL } from "@env";

// GET - all reviews
export const getAllReviews = async () => {
  try {
    console.log("[getAllReviews] Fetching...");
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
  try {
    console.log("[getAllReviewsByMovie] Fetching...", { id });
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
  if (!id) throw new Error("No userId provided!");

  try {
    console.log("[getAllReviewsByUser] Fetching...", { id });
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
