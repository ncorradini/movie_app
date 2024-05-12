import "./MovieList.scss";
import { useEffect } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import UseQueryParam from "hooks/useQueryParam";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { setSearchQuery } from "store/slice";
import { parseNumberQueryParam } from "utils/parseNumberQueryParam";
import { Spinner, Stack } from "@fluentui/react";
import ErrorView from "@Atoms/ErrorView/ErrorView";
import ModalMovie from "@Molecules/ModalMovie/ModalMovie";
import MovieListContent from "@Molecules/MovieListContent/MovieListContent";

export const MovieList = () => {
  const { getQueryParam } = UseQueryParam();
  const searchParam = getQueryParam("search");
  const pageParam = getQueryParam("page");
  const yearParam = getQueryParam("year");

  const dispatch = useAppDispatch();
  const {
    movies: { isLoading, isError },
  } = useAppSelector((state) => state.movies);

  const reloadPage = () => window.location.reload();

  const fetchMovies = () => {
    const page = parseNumberQueryParam(pageParam, undefined);
    const year = parseNumberQueryParam(yearParam, undefined);

    if (searchParam) {
      dispatch(setSearchQuery({ query: searchParam }));
      dispatch(
        getSearchMovie({
          query: searchParam,
          page,
          year,
        })
      );
    } else {
      dispatch(getAllMovies({ page, year }));
    }
  };

  useEffect(() => {
    if (pageParam || searchParam || yearParam) {
      fetchMovies();
      return;
    }

    dispatch(getAllMovies({}));
  }, []);

  if (isLoading)
    return (
      <Stack as="div" className="loading-view">
        <Spinner styles={{ circle: { height: "80px", width: "80px" } }} />
      </Stack>
    );

  if (isError)
    return <ErrorView textAction="Recargar la página" action={reloadPage} />;

  return (
    <Stack as="section" className="movie-list">
      <ModalMovie />
      <MovieListContent />
    </Stack>
  );
};

export default MovieList;
