import "./PageSelector.scss";
import { PrimaryButton, Stack, Text } from "@fluentui/react";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import { UseQueryParam } from "@Hooks/useQueryParam";
import { useAppSelector } from "@Hooks/useAppSelector";

enum PageDirection {
  NEXT = "next",
  PREV = "prev",
}

const PageSelector = () => {
  const dispatch = useAppDispatch();
  const {
    movies: {
      pagination: { page, totalPages },
      searchQuery,
    },
  } = useAppSelector((state) => state.movies);
  const { getQueryParam, updateQueryParam, deleteQueryParam } = UseQueryParam();

  const yearParam = getQueryParam("year");

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
      dispatch(
        getSearchMovie({
          query: searchQuery,
          page: viewPage,
          year: yearParam || undefined,
        })
      );
    } else {
      dispatch(getAllMovies({ page: viewPage, year: yearParam || undefined }));
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
        className="page-selector__button"
        disabled={isDisabledPrevButton}
      >
        Anterior
      </PrimaryButton>
      <Text as="p">
        Página {page} de {totalPages}
      </Text>
      <PrimaryButton
        onClick={handleNextPage}
        className="page-selector__button"
        disabled={isDisabledNextButton}
      >
        Siguiente
      </PrimaryButton>
    </Stack>
  );
};

export default PageSelector;
