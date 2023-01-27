import { Text, View, StyleSheet } from "react-native";
import { Movie } from "../models/movie";

interface Props {
  movie: Movie;
}

export const MovieItem = ({ movie }: Props) => {
  return (
    <View>
      <Text>{movie.title}</Text>
    </View>
  );
};

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
