import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteImage } from "../api";
import { Image } from "../api/types";

interface useDeleteImageProps {
  onSuccess?: () => void;
}

const useDeleteImage = ({ onSuccess }: useDeleteImageProps) => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: Image) => deleteImage(data),
    onSuccess: (image: Image) => {
      queryClient.setQueryData(["images"], (images: Image[]) => {
        return images ? images.filter(({ id }) => image.id !== id) : images;
      });
      queryClient.setQueryData(["images", { id: image.id }], undefined);

      onSuccess && onSuccess();
    },
  });

  return { deleteImage: mutate, isError, isDeleting: isPending };
};

export default useDeleteImage;
