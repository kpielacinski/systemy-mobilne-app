import { Text, View, StyleSheet, Image } from "react-native";
import { Movie } from "../models/movie";

interface Props {
  movie: Movie;
}

export const MovieItem = ({ movie }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: movie.image }}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
      />
      <View style={styles.wrapper}>
        <Text>{movie.title}</Text>
        <Text>{movie.rating}</Text>
        <Text>{movie.year}</Text>
        <Text>{movie.genre.toString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
