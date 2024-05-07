import { TMovieState, initialMovieState } from "./movies";
import { TMovieModalState, initialMovieModalState } from "./movie-modal";

export type TInitialState = {
  movies: TMovieState;
  movieModal: TMovieModalState;
};

export const initialState: TInitialState = {
  movies: initialMovieState,
  movieModal: initialMovieModalState,
};
