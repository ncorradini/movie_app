import MovieCard from "@Molecules/MovieCard/MovieCard";
import NotResultsView from "@Atoms/NotResultsView/NotResultsView";
import { useAppSelector } from "hooks/useAppSelector";

const MovieListContent = () => {
  const {
    movies: { list, existResults },
  } = useAppSelector((state) => state.movies);

  if (existResults) {
    return list.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  } else {
    return <NotResultsView />;
  }
};

export default MovieListContent;
