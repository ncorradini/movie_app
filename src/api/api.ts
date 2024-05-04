import { TMoviesResponse, moviesResponseSchema } from "./schema";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const OPTIONS = { method: "GET", headers: { accept: "application/json" } };

export const getAllMovies = async (): Promise<TMoviesResponse | null> => {
  return fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`, OPTIONS)
    .then((response) => response.json())
    .then((response) => {
      console.log(moviesResponseSchema.parse(response));
      return moviesResponseSchema.parse(response);
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

// https://api.themoviedb.org/3/configuration
// usar esa api para obtener el url para las imagenes
