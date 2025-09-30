import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useBottomPadding(navbarHeight = 65) {
  const insets = useSafeAreaInsets();
  return { paddingBottom: navbarHeight + insets.bottom };
}
