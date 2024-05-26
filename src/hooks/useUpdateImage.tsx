import { updateImage } from "../api";
import { Image, UpdateImage } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseUpdateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useUpdateImage = (options?: UseUpdateImageOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: UpdateImage) => {
      const image = await updateImage(payload);

      dispatch({ payload: image, type: "SET_IMAGE" });

      return image;
    },
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
