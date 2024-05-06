import { IDropdownOption } from "@fluentui/react";

export const OPTION_ALL_VALUES = "all";

export const yearOptions: IDropdownOption[] = Array.from(
  { length: new Date().getFullYear() - 1950 },
  (_, index) => {
    const year = 1950 + index;
    return {
      key: year.toString(),
      text: year.toString(),
    };
  }
);
