import "./MovieList.scss";
import { useEffect } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies } from "store/actions";
import { Spinner, Stack, Text } from "@fluentui/react";
import MovieCardWithModal from "@Molecules/MovieCardWithModal/MovieCardWithModal";
import ErrorView from "@Atoms/ErrorView/ErrorView";

export const MovieList = () => {
  const dispatch = useAppDispatch();
  const { listMovies, isLoading, isError } = useAppSelector(
    (state) => state.movies
  );

  const reloadPage = () => window.location.reload();

  useEffect(() => {
    dispatch(getAllMovies());
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
