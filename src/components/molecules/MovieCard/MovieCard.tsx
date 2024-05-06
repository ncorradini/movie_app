import "./MovieCard.scss";
import { Stack, Text } from "@fluentui/react";
import { IMAGE_URL } from "utils/constants";
import Image from "@Atoms/Image/Image";
import { TMovie } from "utils/schemas/movies.schema";

type CardProps = {
  movie: TMovie;
  onClick: () => void;
};

const MovieCard = ({ movie, onClick }: CardProps) => {
  return (
    <Stack className="movie-card" as="article" onClick={onClick}>
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
