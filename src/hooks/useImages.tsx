import { useCallback } from "react";

import useStore from "../stores/store";
import useQuery from "./useQuery";

const useImages = () => {
  const list = useStore((store) => store.images.list);
  const queryFn = useCallback(() => list(), [list]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const images = useStore((store) => store.images.images());

  return {
    data: images,
    isError,
    isLoading,
    status,
  };
};

export default useImages;
