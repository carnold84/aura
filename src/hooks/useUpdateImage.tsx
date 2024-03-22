import { useCallback } from "react";

import useStore from "../stores/store";
import { Image, UpdateImage } from "../types";
import useMutation from "./useMutation";

interface UseUpdateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useUpdateImage = (options?: UseUpdateImageOptions) => {
  const update = useStore((store) => store.images.update);
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
