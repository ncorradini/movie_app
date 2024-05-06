import "./MoviePage.scss";
import { Text } from "@fluentui/react/lib/Text";
import SearchInput from "@Atoms/SearchInput/SearchInput";
import MovieList from "@Organisms/MovieList/MovieList";
import { Stack } from "@fluentui/react";

function MoviePage() {
  return (
    <Stack as="main" className="movies-view">
      <Text variant="xxLarge" as="h1" className="movies-view_title">
        Peli App
      </Text>
      <SearchInput />
      <MovieList />
    </Stack>
  );
}

export default MoviePage;
