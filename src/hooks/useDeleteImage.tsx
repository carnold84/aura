import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { ImageWithProjects } from "../types";
import useMutation from "./useMutation";

interface UseDeleteImageOptions {
  onSuccess?: (data: ImageWithProjects) => void;
}

const useDeleteImage = (options?: UseDeleteImageOptions) => {
  const deleteImage = useDataStore((store) => store.images.delete);
  const mutationFn = useCallback(
    (payload: ImageWithProjects) => deleteImage(payload),
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
