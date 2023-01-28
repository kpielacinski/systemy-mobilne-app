import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="All movies"
          onPress={() => navigation.navigate("Movies" as never)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Genres"
          onPress={() => navigation.navigate("Genres" as never)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Random movie"
          onPress={() => navigation.navigate("RandomMovie" as never)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 300,
    justifyContent: "center",
    paddingVertical: 12,
  },
});
