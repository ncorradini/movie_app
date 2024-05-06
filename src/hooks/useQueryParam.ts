const UseQueryParam = () => {
  const updateQueryParam = (paramName: string, paramValue: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(paramName, paramValue);

    const paramsString = urlParams.toString();
    const newSearchParams = paramsString ? `?${paramsString}` : "";
    const newUrl = `${window.location.pathname}${newSearchParams}`;
    window.history.pushState({}, "", newUrl);
  };

  const getQueryParam = (paramName: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  };

  const deleteQueryParam = (paramName: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(paramName);

    const paramsString = urlParams.toString();
    const newSearchParams = paramsString ? `?${paramsString}` : "";
    const newUrl = `${window.location.pathname}${newSearchParams}`;
    window.history.pushState({}, "", newUrl);
  };

  return { updateQueryParam, getQueryParam, deleteQueryParam };
};

export default UseQueryParam;
