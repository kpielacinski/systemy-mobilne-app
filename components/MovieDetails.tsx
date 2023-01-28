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
import { insertMovies } from "../utils/database";

interface Props {
  movie: Movie;
}

export default function MovieDetails({ movie }: Props) {
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year.toString());
  const [rating, setRating] = useState(movie.rating.toFixed(1));

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
            paddingTop: 12,
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
            <TextInput
              value={year.toString()}
              keyboardType="numeric"
              onChangeText={(e) => setYear(e)}
            />
            <TextInput
              value={rating.toString()}
              keyboardType="numeric"
              onChangeText={(e) => {
                if (/^[\d]*\.?[\d]{0,2}$/.test(e)) {
                  setRating(e);
                }
              }}
            />
            <View style={{ justifyContent: "space-around", width: 200 }}>
              <Button title="Update" onPress={onUpdateHandler} />
              <Button title="Delete" color={"red"} />
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
    marginTop: 12,
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
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 14,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 16,
    flexShrink: 1,
    maxWidth: "60%",
    flexWrap: "wrap",
  },
});
