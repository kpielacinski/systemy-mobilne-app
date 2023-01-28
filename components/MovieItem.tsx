import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Movie } from "../models/movie";

interface Props {
  movie: Movie;
  onPress: () => void;
}

export const MovieItem = ({ movie, onPress }: Props) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <Image
          source={{ uri: movie.image }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <View style={styles.wrapper}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text>{movie.rating.toFixed(1)}</Text>
          <Text>{movie.year}</Text>
          <Text>{movie.genre.toString()}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 14,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  wrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexShrink: 1,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
