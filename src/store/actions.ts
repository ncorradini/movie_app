import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "utils/constants";
import {
  movieByIdResponseSchema,
  moviesResponseSchema,
} from "utils/schemas/movies.schema";

const OPTIONS = { method: "GET", headers: { accept: "application/json" } };

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async () => {
    const response = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY}&language=es-ES`,
      OPTIONS
    );
    const data = await response.json();
    return moviesResponseSchema.parse(data);
  }
);

export const getSearchMovie = createAsyncThunk(
  "movies/getSearchMovie",
  async (query: string) => {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`,
      OPTIONS
    );
    const data = await response.json();
    return moviesResponseSchema.parse(data);
  }
);

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (id: number) => {
    const response = await fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`,
      OPTIONS
    );
    const data = await response.json();
    return movieByIdResponseSchema.parse(data);
  }
);
