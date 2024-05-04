import "./MovieCard.scss";
import { TMovie } from "api/schema";
import { Stack, Text } from "@fluentui/react";

const IMAGE_URL = "http://image.tmdb.org/t/p/w300";

type MovieCardProps = {
  movie: TMovie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Stack className="movie-card" as="article">
      <picture className="movie-card_image">
        {movie.poster_path ? (
          <img src={`${IMAGE_URL}/${movie.poster_path}`} alt="Poster" />
        ) : (
          <div className="movie-card_image_not-available">
            <Text>Imagen no disponible</Text>
          </div>
        )}
      </picture>
      <Stack>
        <Text as="h4" variant="large">
          {movie.title}
        </Text>
        <Text variant="small">Fecha de estreno: {movie.release_date}</Text>
      </Stack>
    </Stack>
  );
};

export default MovieCard;
