import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.movieModal.movie = null;
    },
    setSearchQuery: (
      state: TInitialState,
      action: PayloadAction<{ query: string }>
    ) => {
      state.searchQuery = action.payload.query;
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

export const { clearMovieModalCache, setSearchQuery } = movieSlice.actions;

export default movieSlice.reducer;
