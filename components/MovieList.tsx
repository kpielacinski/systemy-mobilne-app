import { Text, View, StyleSheet, FlatList } from "react-native";
import { Movie } from "../models/movie";
import { MovieItem } from "./MovieItem";

interface Props {
  movies: Movie[];
}

export const MovieList = ({ movies }: Props) => {
  return (
    <View style={styles.moviesContainer}>
      <FlatList
        data={movies}
        renderItem={(itemData) => {
          return <MovieItem movie={itemData.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  moviesContainer: {
    padding: 24,
    flex: 1,
    flexDirection: "column",
    gap: 12,
  },
});
