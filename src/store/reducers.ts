import { PayloadAction } from "@reduxjs/toolkit";
import { TMovie, TMovieById } from "utils/schemas/movies.schema";
import { TInitialState } from "./initialState";

export const handleRequestPending = (state: TInitialState) => {
  state.isLoading = true;
  state.isError = false;
};

export const handleRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<{ results: TMovie[] }>
) => {
  state.isLoading = false;
  state.listMovies = action.payload.results;
};

export const handleRequestRejected = (state: TInitialState) => {
  state.isLoading = false;
  state.isError = true;
};

export const handleMovieRequestPending = (state: TInitialState) => {
  state.isLoadingModal = true;
  state.isErrorModal = false;
};

export const handleMovieRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<TMovieById>
) => {
  state.isLoadingModal = false;
  state.movieModal = action.payload;
};

export const handleMovieRequestRejected = (state: TInitialState) => {
  state.isLoadingModal = false;
  state.isErrorModal = true;
};
