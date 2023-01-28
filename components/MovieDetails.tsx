import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Movie } from "../models/movie";
import { deleteMovie, insertMovies } from "../utils/database";

interface Props {
  movie: Movie;
}

export default function MovieDetails({ movie }: Props) {
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year.toString());
  const [rating, setRating] = useState(movie.rating.toFixed(1));
  const navigation = useNavigation();
  async function onUpdateHandler() {
    const updatedMovie: Movie = {
      ...movie,
      title,
      year: parseInt(year),
      rating: parseFloat(rating),
    };
    await insertMovies([updatedMovie])
      .then(() => {
        Toast.show({ type: "success", text1: "Updated!" });
      })
      .catch((error) => {
        Toast.show({ type: "error", text1: "Error", text2: error });
      });
  }

  async function onDeleteHandler() {
    const id = movie.id;
    await deleteMovie(id)
      .then(() => {
        Toast.show({ type: "success", text1: "Movie deleted!" });
        navigation.goBack();
      })
      .catch((error) => {
        Toast.show({ type: "error", text1: "Error", text2: error });
      });
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <ImageBackground
        style={styles.background}
        source={{ uri: movie.image }}
        blurRadius={12}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: movie.image }}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "cover",
              borderRadius: 12,
              borderWidth: 1,
            }}
          />
          <View style={styles.mainCardView}>
            <TextInput
              value={title}
              style={styles.text}
              onChangeText={(e) => setTitle(e)}
            />
            <View style={styles.wrapper}>
              <TextInput
                style={styles.year}
                value={year.toString()}
                keyboardType="numeric"
                onChangeText={(e) => setYear(e)}
              />
              <TextInput
                style={styles.rating}
                value={rating.toString()}
                keyboardType="numeric"
                onChangeText={(e) => {
                  if (/^[\d]*(\.|\,)?[\d]{0,2}$/.test(e)) {
                    setRating(e);
                  }
                }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-around",
                width: 200,
              }}
            >
              <Button title="Update" onPress={onUpdateHandler} />
              <Button title="Delete" onPress={onDeleteHandler} color={"red"} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    flexGrow: 1,
    heigh: "100%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mainCardView: {
    marginTop: -120,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    padding: 16,
    flexDirection: "column",
    maxWidth: "60%",
    flexWrap: "wrap",
  },
  wrapper: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  year: {},
  rating: { fontWeight: "bold", fontSize: 30, color: "green" },
});
