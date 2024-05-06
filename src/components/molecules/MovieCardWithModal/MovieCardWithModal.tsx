import { TMovie } from "utils/schemas/movies.schema";
import { useBoolean } from "@fluentui/react-hooks";
import ModalMovie from "@Molecules/ModalMovie/ModalMovie";
import MovieCard from "@Molecules/MovieCard/MovieCard";

type MovieCardProps = {
  movie: TMovie;
};

const MovieCardWithModal = ({ movie }: MovieCardProps) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  return (
    <>
      <ModalMovie
        id={movie.id}
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        showModal={showModal}
      />
      <MovieCard movie={movie} onClick={showModal} />
    </>
  );
};

export default MovieCardWithModal;
