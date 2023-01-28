import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AppLoading from "./components/AppLoading";
import { MovieList } from "./components/MovieList";
import { Movie } from "./models/movie";
import GenresScreen from "./screens/GenresScreen";
import {
  fetchGenres,
  fetchMoviesFromDb,
  init,
  insertMovies,
} from "./utils/database";
import { fetchMovies } from "./utils/http";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import MoviesScreen from "./screens/MoviesScreen";
import MoviesByGenreScreen from "./screens/MoviesByGenreScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import Toast from "react-native-toast-message";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Genres" component={GenresScreen} />
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="MoviesByGenre" component={MoviesByGenreScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
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