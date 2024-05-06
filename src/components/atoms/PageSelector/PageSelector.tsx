import "./PageSelector.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { PrimaryButton, Stack, Text } from "@fluentui/react";
import { getAllMovies, getSearchMovie } from "store/actions";
import { useAppDispatch } from "hooks/useAppDispatch";
import UseQueryParam from "hooks/useQueryParam";

enum PageDirection {
  NEXT = "next",
  PREV = "prev",
}

const PageSelector = () => {
  const dispatch = useAppDispatch();
  const {
    pagination: { page, totalPages },
    searchQuery,
  } = useAppSelector((state) => state.movies);
  const { updateQueryParam, deleteQueryParam } = UseQueryParam();

  const handlePageChange = (direction: PageDirection) => {
    if (
      (direction === PageDirection.NEXT && page === totalPages) ||
      (direction === PageDirection.PREV && page === 1)
    )
      return;

    const viewPage =
      direction === PageDirection.NEXT
        ? String(Number(page) + 1)
        : String(Number(page) - 1);

    if (searchQuery) {
      dispatch(getSearchMovie({ query: searchQuery, page: viewPage }));
    } else {
      dispatch(getAllMovies({ page: viewPage }));
    }

    if (Number(viewPage) > 1) {
      updateQueryParam("page", viewPage);
    } else {
      deleteQueryParam("page");
    }
  };

  const handlePrevPage = () => handlePageChange(PageDirection.PREV);
  const handleNextPage = () => handlePageChange(PageDirection.NEXT);

  const isDisabledPrevButton = page === 1;
  const isDisabledNextButton = page === totalPages;

  return (
    <Stack as="nav" className="page-selector">
      <PrimaryButton
        onClick={handlePrevPage}
        className="page-selector_button"
        disabled={isDisabledPrevButton}
      >
        Anterior
      </PrimaryButton>
      <Text as="p">
        Página {page} de {totalPages}
      </Text>
      <PrimaryButton
        onClick={handleNextPage}
        className="page-selector_button"
        disabled={isDisabledNextButton}
      >
        Siguiente
      </PrimaryButton>
    </Stack>
  );
};

export default PageSelector;
