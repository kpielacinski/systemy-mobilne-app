import { Text, View, StyleSheet, FlatList } from "react-native";
import { Movie } from "../models/movie";
import { MovieItem } from "./MovieItem";

interface Props {
  movies: Movie[];
}

export const MovieList = ({ movies }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={(itemData) => {
          return (
            <View style={styles.flatListItem}>
              <MovieItem movie={itemData.item} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  flatListItem: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 6,
  },
});
