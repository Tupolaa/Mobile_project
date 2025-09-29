// services/authService.js
import { BACKEND_URL } from "@env";

export async function loginRequest(username, password) {
  const res = await fetch(`${BACKEND_URL}/mobileAuth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return res.json(); // token or error message
}


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

  return res.json(); // token or error message
}