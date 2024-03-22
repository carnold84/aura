import { useCallback } from "react";

import useStore from "../stores/store";
import useQuery from "./useQuery";

const useImage = (id: string) => {
  const get = useStore((store) => store.images.get);
  const queryFn = useCallback(() => get(id), [get, id]);
  const { isError, isLoading, status } = useQuery({
    queryFn,
  });
  const image = useStore((store) => store.images.image(id));

  return {
    data: image,
    isError,
    isLoading,
    status,
  };
};

export default useImage;
