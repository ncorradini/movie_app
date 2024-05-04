import './MovieList.scss';
import { useEffect, useState } from "react";
import { getAllMovies } from "../../../api/api";
import MovieCard from "@Atoms/MovieCard/MovieCard";
import { TMovie } from "api/schema";

const MovieList = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await getAllMovies();
      if (moviesData) setMovies(moviesData.results);
    };
    getMovies();
  }, []);

  return (
    <div className='movie-list'>
      {movies.length > 0 &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MovieList;
