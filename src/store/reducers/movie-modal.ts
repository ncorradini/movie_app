import { PayloadAction } from "@reduxjs/toolkit";
import { TInitialState } from "../states/root";
import { TMovieById } from "utils/schemas/movies.schema";

export const handleMovieRequestPending = (state: TInitialState) => {
  state.movieModal.isLoading = true;
  state.movieModal.isError = false;
};

export const handleMovieRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<TMovieById>
) => {
  state.movieModal.isLoading = false;
  state.movieModal.movie = action.payload;
};

export const handleMovieRequestRejected = (state: TInitialState) => {
  state.movieModal.isLoading = false;
  state.movieModal.isError = true;
};
