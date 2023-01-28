import { Movie } from "../models/movie";
import axios from "axios";

const BACKEND_URL =
  "https://systemy-mobilne-4c084-default-rtdb.europe-west1.firebasedatabase.app";

export async function fetchMovies() {
  const response = await axios.get(BACKEND_URL + "/movies.json");

  const movies: Movie[] = response.data;

  return movies;
}
