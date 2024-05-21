import { PayloadAction } from "@reduxjs/toolkit";
import { TMovie } from "utils/schemas/movies.schema";
import { TInitialState } from "../states/root";

export const handleMoviesRequestPending = (state: TInitialState) => {
  state.movies.isLoading = true;
  state.movies.isError = false;
};

export const handleMoviesRequestFulfilled = (
  state: TInitialState,
  action: PayloadAction<{
    results: TMovie[];
    page: number;
    total_pages: number;
  }>
) => {
  state.movies.isLoading = false;
  state.movies.list = action.payload.results;
  state.movies.existResults = action.payload.results.length > 0;
  state.movies.pagination.page = action.payload.page;
  state.movies.pagination.totalPages = action.payload.total_pages;
};

export const handleMoviesRequestRejected = (state: TInitialState) => {
  state.movies.isLoading = false;
  state.movies.isError = true;
};

export const setSearchQuery = (
  state: TInitialState,
  action: PayloadAction<{ query: string }>
) => {
  state.movies.searchQuery = action.payload.query;
};
