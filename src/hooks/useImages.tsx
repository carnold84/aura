import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import useQuery from "./useQuery";

const useImages = () => {
  const list = useDataStore((store) => store.images.list);
  const queryFn = useCallback(() => list(), [list]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const images = useDataStore((store) => store.images.images());

  return {
    data: images,
    isError,
    isLoading,
    status,
  };
};

export default useImages;
