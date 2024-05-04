import "./SearchInput.scss";
import { useEffect, useState } from "react";
import { TextField } from "@fluentui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies, getSearchMovie } from "store/actions";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      dispatch(getSearchMovie(searchTerm));
    }

    if (!firstRender && searchTerm === "") {
      dispatch(getAllMovies());
    }

    setFirstRender(false);
  }, [searchTerm]);

  return (
    <TextField
      className="search-input"
      placeholder="¿Qué película quieres ver?"
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
