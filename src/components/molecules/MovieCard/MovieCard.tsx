import "./MovieCard.scss";
import { Stack, Text } from "@fluentui/react";
import { IMAGE_URL } from "utils/constants";
import Image from "@Atoms/Image/Image";
import { TMovie } from "utils/schemas/movies.schema";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setMovieModalId } from "store/slice";

type CardProps = {
  movie: TMovie;
};

const MovieCard = ({ movie }: CardProps) => {
  const dispatch = useAppDispatch();

  const handleClickCard = () => {
    dispatch(setMovieModalId({ idMovie: movie.id }));
  };

  return (
    <Stack className="movie-card" as="article" onClick={handleClickCard}>
      <Stack as="picture" className="movie-card_image">
        <Image
          available={movie.poster_path}
          src={`${IMAGE_URL}/${movie.poster_path}`}
          alt="Poster de la película"
          notAvailableClassName="movie-card_image_not-available"
        />
      </Stack>
      <Stack as="section" className="movie-card_content">
        <Text as="h4" variant="large">
          {movie.title}
        </Text>
        <Text as="p" variant="small">
          Fecha de estreno: {movie.release_date}
        </Text>
      </Stack>
    </Stack>
  );
};

export default MovieCard;
