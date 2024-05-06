import { PayloadAction } from "@reduxjs/toolkit";
import { TMovie, TMovieById } from "utils/schemas/movies.schema";
import { TInitialState } from "./initialState";

export const handleRequestPending = (state: TInitialState) => {
  state.isLoading = true;
  state.isError = false;
};

export const handleRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<{
    results: TMovie[];
    page: number;
    total_pages: number;
  }>
) => {
  state.isLoading = false;
  state.listMovies = action.payload.results;
  state.pagination.page = action.payload.page;
  state.pagination.totalPages = action.payload.total_pages;
};

export const handleRequestRejected = (state: TInitialState) => {
  state.isLoading = false;
  state.isError = true;
};

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
