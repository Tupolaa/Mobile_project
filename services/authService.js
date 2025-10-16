// services/authService.js
// Small wrapper around authentication HTTP calls used by screens.
// Exports two async helpers:
// - loginRequest(username, password): POST /mobileAuth/login
// - registerRequest(username, password): POST /mobileAuth/register
//
// Each function returns the parsed JSON body on success (typically an object
// containing a `token` on success) and throws an Error with a message from the
// backend on failure.
import { BACKEND_URL } from "@env";

// Helper to perform login. Returns parsed JSON on success.
// Caller should handle the returned object (usually { token }).
export async function loginRequest(username, password) {
  const res = await fetch(`${BACKEND_URL}/mobileAuth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // If the response is not OK, try to extract the `message` from body and throw error
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  // On success return the parsed JSON (e.g. { token: '...' })
  return res.json();
}


// Register a new user. Returns parsed JSON on success.
export async function registerRequest(username, password) {
  const res = await fetch(`${BACKEND_URL}/mobileAuth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return res.json();
}