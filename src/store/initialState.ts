import { TMovie, TMovieById } from "utils/schemas/movies.schema";

export type TInitialState = {
  listMovies: TMovie[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string | null;
  movieModal: {
    movie: TMovieById | null;
    isLoading: boolean;
    isError: boolean;
  };
  pagination: {
    page: number;
    totalPages: number;
  };
};

export const initialState: TInitialState = {
  listMovies: [],
  isLoading: false,
  isError: false,
  searchQuery: null,
  movieModal: {
    movie: null,
    isLoading: false,
    isError: false,
  },
  pagination: {
    page: 0,
    totalPages: 0,
  },
};
