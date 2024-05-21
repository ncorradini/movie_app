import "./MovieList.scss";
import { useEffect } from "react";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { Spinner, Stack } from "@fluentui/react";
import ErrorView from "@Atoms/ErrorView/ErrorView";
import { setSearchQuery } from "store/slice";
import MovieCard from "@Molecules/MovieCard/MovieCard";
import ModalMovie from "@Molecules/ModalMovie/ModalMovie";
import NotResultsView from "@Atoms/NotResultsView/NotResultsView";
import { UseQueryParam } from "@Hooks/useQueryParam";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import { useAppSelector } from "@Hooks/useAppSelector";

export const MovieList = () => {
  const { getQueryParam, deleteQueryParam } = UseQueryParam();
  const searchParam = getQueryParam("search");
  const pageParam = getQueryParam("page");
  const yearParam = getQueryParam("year");

  const dispatch = useAppDispatch();
  const {
    movies: { list, isLoading, isError },
  } = useAppSelector((state) => state.movies);

  const reloadPage = () => window.location.reload();

  const fetchMovies = () => {
    let page = pageParam || "1";
    if (isNaN(parseInt(page))) {
      deleteQueryParam("page");
      page = "1";
    }

    let year = yearParam || undefined;
    if (year && isNaN(parseInt(year))) {
      deleteQueryParam("year");
      year = undefined;
    }

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
      {list.length > 0 ? (
        list?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <NotResultsView />
      )}
    </Stack>
  );
};

export default MovieList;
