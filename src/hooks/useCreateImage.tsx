import { createImage } from "../api";
import { CreateImage, Image } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseCreateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useCreateImage = (options?: UseCreateImageOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: CreateImage) => {
      const image = await createImage(payload);

      dispatch({ payload: image, type: "SET_IMAGE" });

      return image;
    },
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
