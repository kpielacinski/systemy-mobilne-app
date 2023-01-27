import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { MovieList } from "./components/MovieList";
import { Movie } from "./models/Movie";
import { fetchMovies } from "./utils/http";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleFetchMovies() {
    const movies = await fetchMovies();
    setMovies(movies);
  }

  if (movies.length > 0) {
    return (
      <View style={styles.container}>
        <MovieList movies={movies} />
        <Button title="Delete movies" onPress={() => setMovies([])} />
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
