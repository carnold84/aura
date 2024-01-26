import { useMutation } from "@tanstack/react-query";

import { createImage } from "../api";
import { CreateImage } from "../api/types";

const useCreateImage = () => {
  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: CreateImage) => createImage(data),
  });

  return { createImage: mutate, isError, isSaving: isPending };
};

export default useCreateImage;
