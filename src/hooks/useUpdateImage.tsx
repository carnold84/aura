import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { Image, UpdateImage } from "../types";
import useMutation from "./useMutation";

interface UseUpdateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useUpdateImage = (options?: UseUpdateImageOptions) => {
  const update = useDataStore((store) => store.images.update);
  const mutationFn = useCallback(
    (payload: UpdateImage) => update(payload),
    [update],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    updateImage: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useUpdateImage;
