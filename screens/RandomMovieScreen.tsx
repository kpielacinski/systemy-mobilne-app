import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import MovieDetails from "../components/MovieDetails";
import { Movie } from "../models/movie";
import { fetchRandomMovie } from "../utils/database";
import { Text } from "react-native";

export function RandomMovieScreen() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchRandomMovieHandler();
  }, [isFocused]);

  async function fetchRandomMovieHandler() {
    const movie = await fetchRandomMovie();
    if (movie) {
      setRandomMovie(movie);
    }
  }

  if (randomMovie) {
    return <MovieDetails movie={randomMovie} />;
  }

  return <Text>Error getting random movie</Text>;
}
