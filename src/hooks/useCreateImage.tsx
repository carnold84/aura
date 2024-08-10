import { createImage } from "../api";
import { CreateImage, Image } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseCreateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useCreateImage = (options?: UseCreateImageOptions) => {
  const { dispatch } = useStore();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: CreateImage) => {
      const image = await createImage(payload);

      dispatch({ payload: image, type: "SET_IMAGE" });

      return image;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    createImage: mutate,
    ...rest,
  };
};

export default useCreateImage;
