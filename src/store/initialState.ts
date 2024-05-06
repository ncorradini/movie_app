import { TMovie, TMovieById } from "utils/schemas/movies.schema";

export type TInitialState = {
  listMovies: TMovie[];
  isLoading: boolean;
  isError: boolean;
  movieModal: {
    movie: TMovieById | null;
    isLoading: boolean;
    isError: boolean;
  };
};

export const initialState: TInitialState = {
  listMovies: [],
  isLoading: false,
  isError: false,
  movieModal: {
    movie: null,
    isLoading: false,
    isError: false,
  },
};
