import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import AppLoading from "../components/AppLoading";
import GenreGridTile from "../components/GenreGridTile";
import { fetchGenres } from "../utils/database";
import MoviesScreen from "./MoviesScreen";

interface Props {
  navigation: any;
}

export default function GenresScreen({ navigation }: Props) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    handleFetchGenres();
  }, []);

  async function handleFetchGenres() {
    const genres = await fetchGenres();
    setGenres(genres);
  }

  function renderGenreItem(genre: string) {
    function pressHandler() {
      navigation.navigate("MoviesByGenre", {
        genre: genre,
      });
    }

    return <GenreGridTile genre={genre} onPress={pressHandler} />;
  }

  if (!genres) {
    <AppLoading />;
  }

  return (
    <FlatList
      data={genres}
      renderItem={(dataItem) => renderGenreItem(dataItem.item)}
      numColumns={2}
    />
  );
}
