/**
 * useBottomPadding.js
 *
 * A custom React hook that calculates bottom padding
 * to prevent content from being overlapped by the navbar
 * or the device’s safe area (e.g., on iPhones with notches).
 *
 * @function useBottomPadding
 * @param {number} [navbarHeight=65] - The height of your navbar in pixels.
 * @returns {{ paddingBottom: number }} A style object with the correct bottom padding.
 *
 * @example
 * // Use this hook if your navbar overlaps your content
 * import useBottomPadding from "../hooks/useBottomPadding";
 * 
 * const contentPadding = useBottomPadding();
 * 
 * // Example usage in a View:
 * <View style={[styles.container, contentPadding]}>
 *   <Text>Your content here</Text>
 * </View>
 * 
 * // In FlatList:
 * <FlatList contentContainerStyle={contentPadding} />
 */

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useBottomPadding(navbarHeight = 65) {
  const insets = useSafeAreaInsets();
  return { paddingBottom: navbarHeight + insets.bottom };
}

