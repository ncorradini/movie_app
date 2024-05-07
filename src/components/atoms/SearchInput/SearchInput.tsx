import "./SearchInput.scss";
import React, { useEffect, useState } from "react";
import { TextField } from "@fluentui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { setSearchQuery } from "store/slice";
import { useAppSelector } from "hooks/useAppSelector";
import UseQueryParam from "hooks/useQueryParam";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const {
    movies: { searchQuery },
  } = useAppSelector((state) => state.movies);
  const { getQueryParam, updateQueryParam, deleteQueryParam } = UseQueryParam();

  const yearParam = getQueryParam("year");

  const handleSearch = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchTerm = (e.target as HTMLInputElement).value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      deleteQueryParam("page");
      updateQueryParam("search", searchTerm);
    } else {
      deleteQueryParam("search");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(setSearchQuery({ query: searchTerm }));
      dispatch(
        getSearchMovie({ query: searchTerm, year: yearParam || undefined })
      );
    }

    if (!firstRender && searchTerm === "") {
      dispatch(setSearchQuery({ query: "" }));
      dispatch(getAllMovies({}));
    }

    setFirstRender(false);
  }, [searchTerm]);

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
