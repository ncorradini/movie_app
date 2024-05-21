export const parseNumberQueryParam = (
  param: string | null,
  defaultValue: string | undefined
): string | undefined => {
  const urlParams = new URLSearchParams(window.location.search);

  let value = param || defaultValue;
  if (value && isNaN(parseInt(value))) {
    urlParams.delete(value);

    const paramsString = urlParams.toString();
    const newSearchParams = paramsString ? `?${paramsString}` : "";
    const newUrl = `${window.location.pathname}${newSearchParams}`;
    window.history.pushState({}, "", newUrl);

    value = defaultValue;
  }
  return value;
};
