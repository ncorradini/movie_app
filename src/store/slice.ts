import { createSlice } from "@reduxjs/toolkit";
import { initialState, TInitialState } from "./initialState";
import { getAllMovies, getMovieById, getSearchMovie } from "./actions";
import {
  handleMovieRequestFulfilled,
  handleMovieRequestPending,
  handleMovieRequestRejected,
  handleRequestFulfilled,
  handleRequestPending,
  handleRequestRejected,
} from "./reducers";

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieModalCache: (state: TInitialState) => {
      state.movieModal = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all movies
      .addCase(getAllMovies.pending, handleRequestPending)
      .addCase(getAllMovies.fulfilled, handleRequestFulfilled)
      .addCase(getAllMovies.rejected, handleRequestRejected)
      // Get movies by query
      .addCase(getSearchMovie.pending, handleRequestPending)
      .addCase(getSearchMovie.fulfilled, handleRequestFulfilled)
      .addCase(getSearchMovie.rejected, handleRequestRejected)
      // Get movie by id
      .addCase(getMovieById.pending, handleMovieRequestPending)
      .addCase(getMovieById.fulfilled, handleMovieRequestFulfilled)
      .addCase(getMovieById.rejected, handleMovieRequestRejected);
  },
});

export const { clearMovieModalCache } = movieSlice.actions;

export default movieSlice.reducer;
