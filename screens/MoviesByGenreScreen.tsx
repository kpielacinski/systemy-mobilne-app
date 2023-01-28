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

export default function MoviesByGenreScreen({ route }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const genre = route.params.genre;

  useEffect(() => {
    handleFetchMoviesFromDb();
  }, []);

  async function handleFetchMovies() {
    const movies = await fetchMovies();
    setMovies(movies);
  }

  async function handleAddMoviesToDb() {
    await insertMovies(movies);
  }

  async function handleFetchMoviesFromDb() {
    const movies = await fetchMoviesFromDb();
    setMovies(movies);
  }

  if (movies.length > 0) {
    return (
      <View style={styles.container}>
        <Text>{genre}</Text>
        <MovieList movies={movies} />
        <Button title="Delete movies" onPress={() => setMovies([])} />
        <Button
          title="Add movies to DB"
          onPress={() => handleAddMoviesToDb()}
        />
        <Button
          title="Load movies from DB"
          onPress={() => handleFetchMoviesFromDb()}
        />
        <Button
          title="Load movies from API"
          onPress={() => handleFetchMovies()}
        />
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
