import { TMovie } from "utils/schemas/movies.schema";

export type TMovieState = {
  list: TMovie[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string | null;
  pagination: {
    page: number;
    totalPages: number;
  };
};

export const initialMovieState: TMovieState = {
  list: [],
  isLoading: false,
  isError: false,
  searchQuery: null,
  pagination: {
    page: 0,
    totalPages: 0,
  },
};
