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

export default function ConfigScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

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

  <View style={styles.container}>
    <Button title="Delete movies" onPress={() => setMovies([])} />
    <Button title="Add movies to DB" onPress={() => handleAddMoviesToDb()} />
    <Button
      title="Load movies from DB"
      onPress={() => handleFetchMoviesFromDb()}
    />
    <Button title="Load movies from API" onPress={() => handleFetchMovies()} />
  </View>;
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
