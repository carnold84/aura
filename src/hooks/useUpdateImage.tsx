import { updateImage } from "../api";
import { Image, UpdateImage } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseUpdateImageOptions {
  onSuccess?: (data: Image) => void;
}

const useUpdateImage = (options?: UseUpdateImageOptions) => {
  const { dispatch } = useStore();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: UpdateImage) => {
      const image = await updateImage(payload);

      dispatch({ payload: image, type: "SET_IMAGE" });

      return image;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    updateImage: mutate,
    ...rest,
  };
};

export default useUpdateImage;
