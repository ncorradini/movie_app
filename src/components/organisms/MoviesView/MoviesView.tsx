import "./MoviewView.scss";
import { Text } from "@fluentui/react/lib/Text";
import MovieList from "@Molecules/MovieList/MovieList";

function MoviesView() {
  return (
    <div className="movies-view">
      <Text variant="xxLarge" as="h1">
        Movie App
      </Text>
      <MovieList />
    </div>
  );
}

export default MoviesView;
