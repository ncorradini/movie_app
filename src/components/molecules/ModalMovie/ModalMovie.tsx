import "./ModalMovie.scss";
import { useEffect } from "react";
import { Image, Modal, Spinner, Stack, Text } from "@fluentui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getMovieById } from "store/actions/movie-modal";
import { clearMovieModalCache, setMovieModalId } from "store/slice";
import { IMAGE_URL_HIGH_DEFINITION } from "utils/constants";
import ErrorView from "@Atoms/ErrorView/ErrorView";

const ModalMovie = () => {
  const dispatch = useAppDispatch();
  const {
    movieModal: { id, movie, isLoading, isError },
  } = useAppSelector((state) => state.movies);

  const hideModal = () => {
    dispatch(setMovieModalId({ idMovie: null }));
  };

  const reloadModal = () => {
    hideModal();
    setTimeout(() => {
      dispatch(setMovieModalId({ idMovie: id }));
    }, 200);
  };

  useEffect(() => {
    if (id && !movie) {
      dispatch(getMovieById(id));
    }

    if (!id && movie) {
      dispatch(clearMovieModalCache());
    }
  }, [id]);

  return (
    <Modal
      isOpen={Boolean(id)}
      onDismiss={hideModal}
      isBlocking={false}
      className="modal-movie"
    >
      {isLoading && (
        <Stack as="div" className="modal-movie__loading-view">
          <Spinner styles={{ circle: { height: "40px", width: "40px" } }} />
        </Stack>
      )}

      {movie && (
        <Stack as="article" className="modal-movie__detail">
          <button
            className="modal-movie__detail_close-button"
            onClick={hideModal}
          >
            X
          </button>
          <Image
            src={`${IMAGE_URL_HIGH_DEFINITION}/${movie.poster_path}`}
            alt="Poster de la película"
            className="modal-movie__detail_poster"
          />
          <Stack as="div" className="modal-movie__detail_content">
            <Text as="h3">{movie.title}</Text>
            <Text as="p">{movie.overview || "Descripción no disponible"}</Text>
            <Text as="p">
              Valoración: {movie.vote_average.toFixed(1) || "N/D"}
            </Text>
          </Stack>
        </Stack>
      )}

      {isError && (
        <ErrorView textAction="Recargar modal" action={reloadModal} />
      )}
    </Modal>
  );
};

export default ModalMovie;
