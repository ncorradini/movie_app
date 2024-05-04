import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TMovie } from "api/schema";
import { getAllMovies, getSearchMovie } from "./actions";

interface TInitialState {
  listMovies: TMovie[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TInitialState = {
  listMovies: [],
  isLoading: false,
  isError: false,
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

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all movies
      .addCase(getAllMovies.pending, handleRequestPending)
      .addCase(getAllMovies.fulfilled, handleRequestFulfilled)
      .addCase(getAllMovies.rejected, handleRequestRejected)
      // Get movies by query
      .addCase(getSearchMovie.pending, handleRequestPending)
      .addCase(getSearchMovie.fulfilled, handleRequestFulfilled)
      .addCase(getSearchMovie.rejected, handleRequestRejected);
  },
});

export default movieSlice.reducer;
