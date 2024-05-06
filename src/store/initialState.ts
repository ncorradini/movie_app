import { TMovie, TMovieById } from "utils/schemas/movies.schema";

export type TInitialState = {
  listMovies: TMovie[];
  isLoading: boolean;
  isError: boolean;
  movieModal: TMovieById | null;
  isLoadingModal: boolean;
  isErrorModal: boolean;
};

export const initialState: TInitialState = {
  listMovies: [],
  isLoading: false,
  isError: false,
  movieModal: null,
  isLoadingModal: false,
  isErrorModal: false,
};
