import { useCallback } from "react";

import useStore from "../stores/store";
import { Image } from "../types";
import useMutation from "./useMutation";

interface UseDeleteImageOptions {
  onSuccess?: (data: Image) => void;
}

const useDeleteImage = (options?: UseDeleteImageOptions) => {
  const deleteImage = useStore((store) => store.images.delete);
  const mutationFn = useCallback(
    (payload: Image) => deleteImage(payload),
    [deleteImage],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    deleteImage: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useDeleteImage;
