import "./ModalMovie.scss";
import { useEffect } from "react";
import { Image, Modal, Spinner, Stack, Text } from "@fluentui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getMovieById } from "store/actions";
import { clearMovieModalCache } from "store/slice";
import { IMAGE_URL_HIGH_DEFINITION } from "utils/constants";
import ErrorView from "@Atoms/ErrorView/ErrorView";

type ModalMovieProps = {
  id: number;
  isModalOpen: boolean;
  hideModal: () => void;
  showModal: () => void;
};

const ModalMovie = ({
  id,
  isModalOpen,
  hideModal,
  showModal,
}: ModalMovieProps) => {
  const dispatch = useAppDispatch();
  const { movieModal, isLoadingModal, isErrorModal } = useAppSelector(
    (state) => state.movies
  );

  const reloadModal = () => {
    hideModal();
    setTimeout(() => {
      showModal();
    }, 200);
  };

  useEffect(() => {
    if (isModalOpen && !movieModal) {
      dispatch(getMovieById(id));
    }

    if (!isModalOpen && movieModal) {
      dispatch(clearMovieModalCache());
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      className="modal-movie"
    >
      {isLoadingModal && (
        <Stack as="div" className="modal-movie_loading-view">
          <Spinner styles={{ circle: { height: "40px", width: "40px" } }} />
        </Stack>
      )}

      {movieModal && (
        <Stack as="article" className="modal-movie_detail">
          <button
            className="modal-movie_detail_close-button"
            onClick={hideModal}
          >
            X
          </button>
          <Image
            src={`${IMAGE_URL_HIGH_DEFINITION}/${movieModal.poster_path}`}
            alt="Poster de la película"
            className="modal-movie_detail_poster"
          />
          <Stack as="div" className="modal-movie_detail_content">
            <Text as="h3">{movieModal.title}</Text>
            <Text as="p">
              {movieModal.overview || "Descripción no disponible"}
            </Text>
            <Text as="p">
              Valoración: {movieModal.vote_average.toFixed(1) || "N/D"}
            </Text>
          </Stack>
        </Stack>
      )}

      {isErrorModal && (
        <ErrorView textAction="Recargar modal" action={reloadModal} />
      )}
    </Modal>
  );
};

export default ModalMovie;
