import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import useQuery from "./useQuery";

const useImage = (id: string) => {
  const get = useDataStore((store) => store.images.get);
  const queryFn = useCallback(() => get(id), [get, id]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const image = useDataStore((store) => store.images.image(id));

  return {
    data: image,
    isError,
    isLoading,
    status,
  };
};

export default useImage;
