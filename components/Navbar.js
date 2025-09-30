// import React from "react";
// import { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Home, Search, Discover, Profile } from "./icons";

// // chatgpt lisäs navigation
// export default function Navbar({ navigation }) {
//   const [active, setActive] = useState("home");

//   // chatgpt
//   const handlePress = (route, name) => {
//     setActive(name);
//     navigation.navigate(route);
//   };

//   // return (
//   //   <View style={styles.navbar}>
//   //     <TouchableOpacity onPress={() => setActive("home")}>
//   //       <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
//   //     </TouchableOpacity>

//   //     <TouchableOpacity onPress={() => setActive("search")}>
//   //       <Search color={active === "search" ? "#2D64AC" : "#424242ff"} />
//   //     </TouchableOpacity>

//   //     <TouchableOpacity onPress={() => setActive("discover")}>
//   //       <Discover color={active === "discover" ? "#2D64AC" : "#424242ff"} />
//   //     </TouchableOpacity>

//   //     <TouchableOpacity onPress={() => setActive("profile")}>
//   //       <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
//   //     </TouchableOpacity>
//   //   </View>
//   // );
//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity onPress={() => handlePress("Home", "home")}>
//         <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => handlePress("Login", "profile")}>
//         <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderColor: "#424242ff",
//     backgroundColor: "#E2E2E2",
//     color: "#000000ff",
//   },
//   link: {
//     padding: 5,
//   },
//   linkText: {
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });

// toka chatgpt tekele
// import React, { useState } from "react";
// import { View, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Home, Search, Discover, Profile } from "./icons";

// export default function Navbar() {
//   const navigation = useNavigation();
//   const [active, setActive] = useState("home");

//   const handlePress = (route, name) => {
//     setActive(name);
//     navigation.navigate(route);
//   };

//   return (
//     <View style={styles.navbar}>
//       <TouchableOpacity onPress={() => handlePress("Home", "home")}>
//         <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => handlePress("Login", "profile")}>
//         <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderColor: "#424242ff",
//     backgroundColor: "#E2E2E2",
//   },
// });

import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Profile } from "./icons";

export default function Navbar() {
  const navigation = useNavigation();
  const [active, setActive] = useState("home");
  const insets = useSafeAreaInsets(); // bottom inset

  const handlePress = (route, name) => {
    setActive(name);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Navbar background only for visible area */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => handlePress("Home", "home")}>
          <Home color={active === "home" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress("Login", "profile")}>
          <Profile color={active === "profile" ? "#2D64AC" : "#424242ff"} />
        </TouchableOpacity>
      </View>

      {/* Extra spacing so navbar content is above device bottom */}
      <View style={{ height: insets.bottom }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "translucent", // optional, matches navbar
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#424242ff",
    backgroundColor: "#E2E2E2",
  },
});
