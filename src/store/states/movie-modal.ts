import { TMovieById } from "utils/schemas/movies.schema";

export type TMovieModalState = {
  id: number | null;
  movie: TMovieById | null;
  isLoading: boolean;
  isError: boolean;
};

export const initialMovieModalState: TMovieModalState = {
  id: null,
  movie: null,
  isLoading: false,
  isError: false,
};
