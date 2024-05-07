import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "utils/constants";
import { movieByIdResponseSchema } from "utils/schemas/movies.schema";

const OPTIONS = { method: "GET", headers: { accept: "application/json" } };

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
