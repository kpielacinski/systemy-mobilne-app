import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import AppLoading from "./components/AppLoading";
import { Movie } from "./models/movie";
import GenresScreen from "./screens/GenresScreen";
import MenuScreen from "./screens/MenuScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import MoviesByGenreScreen from "./screens/MoviesByGenreScreen";
import MoviesScreen from "./screens/MoviesScreen";
import { RandomMovieScreen } from "./screens/RandomMovieScreen";
import { init, insertMovies } from "./utils/database";
import { fetchMovies } from "./utils/http";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  //na potrzeby projektu dane po API pobieraja się przy każdym starcie aplikacji
  //i seedują bazę danych
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
        Toast.show({ type: "success", text1: "DbInitialized" });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (dbInitialized) {
      seedDb();
    }
  }, [dbInitialized]);

  async function seedDb() {
    const movies: Movie[] = await fetchMovies();
    await insertMovies(movies)
      .then(() => {
        Toast.show({ type: "success", text1: "SeedDb done" });
      })
      .catch(() => {
        Toast.show({ type: "error", text1: "SeedDb error" });
      });
  }

  if (!dbInitialized) {
    return <AppLoading />;
  }

  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Genres" component={GenresScreen} />
          <Stack.Screen name="Movies" component={MoviesScreen} />
          <Stack.Screen name="MoviesByGenre" component={MoviesByGenreScreen} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
          <Stack.Screen name="RandomMovie" component={RandomMovieScreen} />
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
