// PUBLIC testing on Real Devices: https://moviereview-472307.lm.r.appspot.com/ENDPOINTS
const API_URL = "https://moviereview-472307.lm.r.appspot.com";

// LOCAL testing on Real Devices: replace with your PC's local IP (e.g. http://192.168.1.100:PORT/ENDPOINTS)
// const API_URL = "http://192.168.1.106:5000";

// LOCAL testing on Android Emulators: use use 10.0.2.2. You also need CORS in server code.
// const API_URL = "http://10.0.2.2:5000";

// GET - all reviews
export const getAllReviews = async () => {
  try {
    console.log("[getAllReviews] Fetching...");
    const res = await fetch(`${API_URL}/review`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[getAllReviews] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getAllReviews] ❌ Error:", err);
    throw err;
  }
};

// GET - all by movie ID
export const getAllReviewsByMovie = async (id) => {
  try {
    console.log("[getAllReviewsByMovie] Fetching...", { id });
    const res = await fetch(`${API_URL}/review/movie/${id}`);

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const json = await res.json();
    console.log("[ggetAllReviewsByMovie] ✅ Fetched:", json.data.length);
    return json.data;
  } catch (err) {
    console.error("[getAllReviewsByMovie] ❌ Error:", err);
    throw err;
  }
};

// GET - all by user ID
// /user/:userId TÄÄ ON SEN AUTHENTICATION TAKANA VANHASSA SERVERI KOODISSA
