const UseQueryParam = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const updateQueryParam = (paramName: string, paramValue: string) => {
    urlParams.set(paramName, paramValue);

    const paramsString = urlParams.toString();
    const newSearchParams = paramsString ? `?${paramsString}` : "";
    const newUrl = `${window.location.pathname}${newSearchParams}`;
    window.history.pushState({}, "", newUrl);
  };

  const getQueryParam = (paramName: string) => {
    return urlParams.get(paramName);
  };

  const deleteQueryParam = (paramName: string) => {
    urlParams.delete(paramName);

    const paramsString = urlParams.toString();
    const newSearchParams = paramsString ? `?${paramsString}` : "";
    const newUrl = `${window.location.pathname}${newSearchParams}`;
    window.history.pushState({}, "", newUrl);
  };

  return { updateQueryParam, getQueryParam, deleteQueryParam };
};

export default UseQueryParam;
