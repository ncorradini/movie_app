import "./MovieList.scss";
import { useEffect } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies, getSearchMovie } from "store/actions";
import { Spinner, Stack, Text } from "@fluentui/react";
import MovieCardWithModal from "@Molecules/MovieCardWithModal/MovieCardWithModal";
import ErrorView from "@Atoms/ErrorView/ErrorView";
import { setSearchQuery } from "store/slice";
import UseQueryParam from "hooks/useQueryParam";

export const MovieList = () => {
  const { getQueryParam, deleteQueryParam } = UseQueryParam();
  const searchParam = getQueryParam("search");
  const pageParam = getQueryParam("page");
  const yearParam = getQueryParam("year");

  const dispatch = useAppDispatch();
  const { listMovies, isLoading, isError } = useAppSelector(
    (state) => state.movies
  );

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
      {listMovies.length > 0 ? (
        listMovies.map((movie) => (
          <MovieCardWithModal key={movie.id} movie={movie} />
        ))
      ) : (
        <Text as="p">No se encontraron resultados</Text>
      )}
    </Stack>
  );
};

export default MovieList;
