/**
 * components/icons/index.js
 *
 * This file centralizes reusable icon components for the app.
 * Each icon is a small React component wrapping an Expo vector icon,
 * allowing consistent styling and easy import throughout the project.
 *
 * Exports:
 * - Home: Ionicons "home-outline" icon (used for Home screen navigation)
 * - Search: Ionicons "search-outline" icon (used for search functionality)
 * - Discover: MaterialCommunityIcons "compass-outline" icon (used for discovery/explore sections)
 * - Profile: Ionicons "person-outline" icon (used for user profile navigation)
 *
 * Usage in navbar:
 * import { Home, Search, Discover, Profile } from "./icons";
 */

import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const Home = (props) => <Ionicons name="home-outline" size={28} {...props} />;
export const Search = (props) => <Ionicons name="search-outline" size={28} {...props} />;
export const Discover = (props) => <MaterialCommunityIcons name="compass-outline" size={28} {...props} />;
export const Profile = (props) => <Ionicons name="person-outline" size={28} {...props} />;
