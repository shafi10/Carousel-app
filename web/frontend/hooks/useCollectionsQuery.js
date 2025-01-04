import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery } from "react-query";
// import { useUI } from "../contexts/ui.context";

export const useCollectionsQuery = ({
  afterCursor,
  beforeCursor,
  limit,
  fetchInit = {},
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const url = `/api/collection/list?afterCursor=${
    afterCursor || ""
  }&beforeCursor=${beforeCursor || ""}&limit=${limit}`;
  //   const { modal } = useUI();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url]);

  return useQuery(["collectionList", afterCursor, beforeCursor], fetch, {
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
    // enabled: !modal?.isOpen,
    // enabled: Object.keys(shop).length === 0,
  });
};
