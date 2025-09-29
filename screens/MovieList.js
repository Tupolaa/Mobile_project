import { useRoute } from "@react-navigation/native";

export default function MovieListScreen() {
  const route = useRoute();
  const { genre } = route.params;
    return <MovieList genre={genre} />;
}
