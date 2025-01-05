import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery } from "react-query";

const useFetchQuery = ({
  apiEndpoint,
  afterCursor,
  beforeCursor,
  limit,
  apiKey,
  fetchInit = {},
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const url = `${apiEndpoint}?afterCursor=${afterCursor || ""}&beforeCursor=${
    beforeCursor || ""
  }&limit=${limit}`;
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url]);

  return useQuery([apiKey, afterCursor, beforeCursor, apiEndpoint], fetch, {
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
  });
};

export default useFetchQuery;
