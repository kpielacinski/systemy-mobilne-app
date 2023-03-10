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

interface Props {
  route: any;
}

export default function MoviesScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    handleFetchMoviesFromDb();
  }, []);

  async function handleFetchMoviesFromDb() {
    const movies = await fetchMoviesFromDb();
    setMovies(movies);
  }

  async function handleFetchMovies() {
    const movies = await fetchMovies();
    setMovies(movies);
  }

  if (movies.length > 0) {
    return (
      <View style={styles.container}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 6,
  },
});
