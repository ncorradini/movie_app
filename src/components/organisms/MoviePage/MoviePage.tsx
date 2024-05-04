import "./MoviePage.scss";
import { Text } from "@fluentui/react/lib/Text";
import SearchInput from "@Atoms/SearchInput/SearchInput";
import MovieList from "@Molecules/MovieList/MovieList";

function MoviePage() {
  return (
    <div className="movies-view">
      <Text variant="xxLarge" as="h1">
        Peli App
      </Text>
      <SearchInput />
      <MovieList />
    </div>
  );
}

export default MoviePage;
