import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { MovieList } from "../components/MovieList";
import { Movie } from "../models/movie";
import {
  insertMovies,
  fetchMoviesFromDb,
  fetchGenres,
} from "../utils/database";
import { fetchMovies } from "../utils/http";

export default function MoviesByGenreScreen({ route, navigation }: any) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const genre = route.params?.genre ?? "";
  const isFocused = useIsFocused();

  useEffect(() => {
    handleFetchMoviesFromDb();
  }, [isFocused]);

  async function handleFetchMovies() {
    const movies = await fetchMovies();
    setMovies(movies);
  }

  async function handleAddMoviesToDb() {
    await insertMovies(movies);
  }

  async function handleFetchMoviesFromDb() {
    const movies = await fetchMoviesFromDb(genre);
    setMovies(movies);
  }

  if (movies.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{genre}</Text>
        <MovieList movies={movies} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hi iOS</Text>
      <Button title="Fetch Movies" onPress={() => handleFetchMovies()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 6,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
