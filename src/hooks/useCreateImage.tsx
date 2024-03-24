import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { CreateImage, Image } from "../types";
import useMutation from "./useMutation";

interface UseCreateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useCreateImage = (options?: UseCreateImageOptions) => {
  const create = useDataStore((store) => store.images.create);
  const mutationFn = useCallback(
    (payload: CreateImage) => create(payload),
    [create],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    createImage: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useCreateImage;
