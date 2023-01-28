import { Text, Button, StyleSheet, View } from "react-native";
import MovieDetails from "../components/MovieDetails";
import { Movie } from "../models/movie";
import Toast from "react-native-toast-message";

export default function MovieDetailsScreen({ navigation, route }: any) {
  const movie: Movie = route.params?.movie;

  if (movie) {
    return <MovieDetails movie={movie} />;
  }

  return <Text>Movie not found</Text>;
}
