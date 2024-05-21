import "./DateSelector.scss";
import { useEffect, useState } from "react";
import { Dropdown, IDropdownOption, Label, Stack } from "@fluentui/react";
import { getAllMovies, getSearchMovie } from "store/actions/movies";
import { useAppDispatch } from "@Hooks/useAppDispatch";
import { useAppSelector } from "@Hooks/useAppSelector";
import { UseQueryParam } from "@Hooks/useQueryParam";

const OPTION_ALL_VALUES = "all";

const YEAR_OPTIONS: IDropdownOption[] = Array.from(
  { length: new Date().getFullYear() - 1950 },
  (_, index) => {
    const year = 1950 + index;
    return {
      key: year.toString(),
      text: year.toString(),
    };
  }
);

const DateSelector = () => {
  const [dateSelected, setDateSelected] = useState(OPTION_ALL_VALUES);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movies);
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

    dispatch(actionGetMovies(dateSelected, movies.searchQuery));
  }, [dateSelected]);

  useEffect(() => {
    if (yearParam) {
      setDateSelected(yearParam);
      setFirstRender(true);
    }
  }, []);

  return (
    <Stack as="div" className="date-selector">
      <Label htmlFor="year" className="date-selector__label">
        Filtrar por año:
      </Label>
      <Dropdown
        id="year"
        placeholder="Seleccione un año"
        selectedKey={dateSelected}
        onChange={handleYearChange}
        options={[{ key: OPTION_ALL_VALUES, text: "Todos" }, ...YEAR_OPTIONS]}
        className="date-selector__dropdown"
      />
    </Stack>
  );
};

export default DateSelector;
