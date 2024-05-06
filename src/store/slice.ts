import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMovie, TMovieById } from "utils/schemas/movies.schema";
import { getAllMovies, getMovieById, getSearchMovie } from "./actions";

interface TInitialState {
  listMovies: TMovie[];
  isLoading: boolean;
  isError: boolean;
  movieModal: TMovieById | null;
  isLoadingModal: boolean;
  isErrorModal: boolean;
}

const initialState: TInitialState = {
  listMovies: [],
  isLoading: false,
  isError: false,
  movieModal: null,
  isLoadingModal: false,
  isErrorModal: false,
};

const handleRequestPending = (state: TInitialState) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<{ results: TMovie[] }>
) => {
  state.isLoading = false;
  state.listMovies = action.payload.results;
};

const handleRequestRejected = (state: TInitialState) => {
  state.isLoading = false;
  state.isError = true;
};

const handleMovieRequestPending = (state: TInitialState) => {
  state.isLoadingModal = true;
  state.isErrorModal = false;
};

const handleMovieRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<TMovieById>
) => {
  state.isLoadingModal = false;
  state.movieModal = action.payload;
};

const handleMovieRequestRejected = (state: TInitialState) => {
  state.isLoadingModal = false;
  state.isErrorModal = true;
};

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
