import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, TInitialState } from "./states/root";

import { getAllMovies, getSearchMovie } from "./actions/movies";
import { getMovieById } from "./actions/movie-modal";

import {
  handleMoviesRequestFulfilled,
  handleMoviesRequestPending,
  handleMoviesRequestRejected,
} from "./reducers/movies";
import {
  handleMovieRequestFulfilled,
  handleMovieRequestPending,
  handleMovieRequestRejected,
} from "./reducers/movie-modal";

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieModalCache: (state: TInitialState) => {
      state.movieModal.movie = null;
    },
    setSearchQuery: (
      state: TInitialState,
      action: PayloadAction<{ query: string }>
    ) => {
      state.movies.searchQuery = action.payload.query;
    },
    setMovieModalId: (
      state: TInitialState,
      action: PayloadAction<{ idMovie: number | null }>
    ) => {
      state.movieModal.id = action.payload.idMovie;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all movies
      .addCase(getAllMovies.pending, handleMoviesRequestPending)
      .addCase(getAllMovies.fulfilled, handleMoviesRequestFulfilled)
      .addCase(getAllMovies.rejected, handleMoviesRequestRejected)
      // Get movies by query
      .addCase(getSearchMovie.pending, handleMoviesRequestPending)
      .addCase(getSearchMovie.fulfilled, handleMoviesRequestFulfilled)
      .addCase(getSearchMovie.rejected, handleMoviesRequestRejected)
      // Get movie by id
      .addCase(getMovieById.pending, handleMovieRequestPending)
      .addCase(getMovieById.fulfilled, handleMovieRequestFulfilled)
      .addCase(getMovieById.rejected, handleMovieRequestRejected);
  },
});

export const { clearMovieModalCache, setSearchQuery, setMovieModalId } =
  movieSlice.actions;

export default movieSlice.reducer;
