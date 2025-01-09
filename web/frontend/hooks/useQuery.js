import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery } from "react-query";

const useFetchQuery = ({ apiEndpoint, apiKey, dependency, fetchInit = {} }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(apiEndpoint, fetchInit);
      return response.json();
    };
  }, [apiEndpoint]);

  return useQuery([apiKey, apiEndpoint, ...dependency], fetch, {
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
  });
};

export default useFetchQuery;
