import { deleteImage } from "../api";
import { Image } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseDeleteImageOptions {
  onSuccess?: (data: Image) => void;
}

const useDeleteImage = (options?: UseDeleteImageOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: Image) => {
      const project = await deleteImage(payload);

      dispatch({ payload: project, type: "REMOVE_IMAGE" });

      return project;
    },
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
