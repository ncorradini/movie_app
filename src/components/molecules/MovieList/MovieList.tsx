import "./MovieList.scss";
import { useEffect } from "react";
import MovieCard from "@Atoms/MovieCard/MovieCard";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies } from "store/actions";
import { Spinner } from "@fluentui/react";

const MovieList = () => {
  const dispatch = useAppDispatch();
  const { listMovies, isLoading, isError } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  if (isLoading)
    return (
      <div className="loading-view">
        <Spinner className="spinner" />
      </div>
    );

  if (isError) return <p>Ha ocurrido un error...</p>;

  return (
    <div className="movie-list">
      {listMovies.length > 0 ? (
        listMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
};

export default MovieList;
