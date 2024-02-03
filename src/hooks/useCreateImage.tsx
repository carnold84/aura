import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createImage } from "../api";
import { CreateImage, Image } from "../api/types";

const useCreateImage = () => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: CreateImage) => createImage(data),
    onSuccess: (image: Image | null) => {
      if (image) {
        queryClient.setQueryData(["images"], (images: Image[]) => {
          return images ? [...images, image] : images;
        });
      }
    },
  });

  return { createImage: mutate, isError, isSaving: isPending };
};

export default useCreateImage;
