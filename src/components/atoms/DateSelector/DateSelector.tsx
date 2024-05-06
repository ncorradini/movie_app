import "./DateSelector.scss";
import { useEffect, useState } from "react";
import { Dropdown, IDropdownOption, Label, Stack } from "@fluentui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getAllMovies, getSearchMovie } from "store/actions";
import { useAppSelector } from "hooks/useAppSelector";
import UseQueryParam from "hooks/useQueryParam";
import { OPTION_ALL_VALUES, yearOptions } from "./utils";

const DateSelector = () => {
  const [dateSelected, setDateSelected] = useState(OPTION_ALL_VALUES);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.movies);
  const { getQueryParam, updateQueryParam, deleteQueryParam } = UseQueryParam();

  const yearParam = getQueryParam("year");

  const handleYearChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (option) {
      setDateSelected(option.key as string);
    }
  };

  const actionGetMovies = (
    dateSelected: string,
    searchQuery: string | null
  ) => {
    deleteQueryParam("page");

    dateSelected !== OPTION_ALL_VALUES
      ? updateQueryParam("year", dateSelected)
      : deleteQueryParam("year");

    const params = { year: dateSelected, query: searchQuery || "" };
    return searchQuery
      ? getSearchMovie(params)
      : getAllMovies({ year: dateSelected });
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (isNaN(parseInt(dateSelected)) && dateSelected !== OPTION_ALL_VALUES) {
      deleteQueryParam("year");
      setDateSelected(OPTION_ALL_VALUES);
      return;
    }

    dispatch(actionGetMovies(dateSelected, searchQuery));
  }, [dateSelected, searchQuery]);

  useEffect(() => {
    if (yearParam) {
      setDateSelected(yearParam);
      setFirstRender(true);
    }
  }, []);

  return (
    <Stack as="div" className="date-selector">
      <Label htmlFor="year">Filtrar por año:</Label>
      <Dropdown
        id="year"
        placeholder="Seleccione un año"
        selectedKey={dateSelected}
        onChange={handleYearChange}
        options={[{ key: OPTION_ALL_VALUES, text: "Todos" }, ...yearOptions]}
        className="date-selector_dropdown"
      />
    </Stack>
  );
};

export default DateSelector;
