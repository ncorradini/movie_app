import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./states/root";

import { getAllMovies, getSearchMovie } from "./actions/movies";
import { getMovieById } from "./actions/movie-modal";

import {
  handleMoviesRequestFulfilled,
  handleMoviesRequestPending,
  handleMoviesRequestRejected,
  setSearchQuery as setsearchQueryReducer,
} from "./reducers/movies";
import {
  handleMovieRequestFulfilled,
  handleMovieRequestPending,
  handleMovieRequestRejected,
  setMovieModalId as setMovieModalIdReducer,
  clearMovieModalCache as clearMovieModalCacheReducer,
} from "./reducers/movie-modal";

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieModalCache: clearMovieModalCacheReducer,
    setSearchQuery: setsearchQueryReducer,
    setMovieModalId: setMovieModalIdReducer,
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
