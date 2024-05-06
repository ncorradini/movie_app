import "./MoviePage.scss";
import { Stack, Text } from "@fluentui/react";
import SearchInput from "@Atoms/SearchInput/SearchInput";
import MovieList from "@Organisms/MovieList/MovieList";
import DateSelector from "@Atoms/DateSelector/DateSelector";
import PageSelector from "@Atoms/PageSelector/PageSelector";

function MoviePage() {
  return (
    <Stack as="main" className="movies-view">
      <Text variant="xxLarge" as="h1" className="movies-view_title">
        Peli App
      </Text>
      <Stack as="div" className="movies-view_controls">
        <SearchInput />
        <DateSelector />
        <PageSelector />
      </Stack>
      <MovieList />
    </Stack>
  );
}

export default MoviePage;
