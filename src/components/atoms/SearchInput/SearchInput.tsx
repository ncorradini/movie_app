import "./SearchInput.scss";
import { useEffect, useState } from "react";
import { TextField } from "@fluentui/react";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { setSearchQuery } from "store/slice";
import { useAppSelector } from "@Hooks/useAppSelector";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import { UseQueryParam } from "@Hooks/useQueryParam";
import { useDebounce } from "@Hooks/useDebounce";

const SearchInput = () => {
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const {
    movies: { searchQuery },
  } = useAppSelector((state) => state.movies);

  const { getQueryParam, updateQueryParam, deleteQueryParam } = UseQueryParam();
  const yearParam = getQueryParam("year");

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSearch = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchTerm = (e.target as HTMLInputElement).value;

    dispatch(setSearchQuery({ query: searchTerm }));

    if (searchTerm.trim() !== "") {
      deleteQueryParam("page");
      updateQueryParam("search", searchTerm);
    } else {
      deleteQueryParam("search");
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        getSearchMovie({
          query: debouncedSearchTerm,
          year: yearParam || undefined,
        })
      );
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!firstRender && searchQuery === "") {
      dispatch(setSearchQuery({ query: "" }));
      dispatch(getAllMovies({}));
    }

    setFirstRender(false);
  }, [searchQuery]);

  return (
    <TextField
      className="search-input"
      placeholder="¿Qué película quieres ver?"
      onChange={handleSearch}
      value={searchQuery || ""}
    />
  );
};

export default SearchInput;
