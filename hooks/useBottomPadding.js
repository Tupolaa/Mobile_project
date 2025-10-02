import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useBottomPadding(navbarHeight = 65) {
  const insets = useSafeAreaInsets();
  return { paddingBottom: navbarHeight + insets.bottom };
}

// Käytä tätä jos navbar overlappaa sen sun contentin kanssa
// import useBottomPadding from "../hooks/useBottomPadding";
// const contentPadding = useBottomPadding();
// <View style={[styles.container, contentPadding]}>TÄÄLLÄ ON SE SUN CONTENTTI</View>
// Flatlisteissä: contentContainerStyle={contentPadding}
