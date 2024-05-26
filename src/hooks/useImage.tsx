import { useCallback, useMemo } from "react";

import { getImage } from "../api";
import { mapImage } from "./useImages";
import useQuery from "./useQuery";
import useStore from "./useStore";

interface UseImagesOptions {
  id?: string;
}

const useImage = ({ id }: UseImagesOptions) => {
  const { dispatch, state } = useStore();
  const image = id ? state.images.data.get(id) : undefined;

  const queryFn = useCallback(async () => {
    if (!id) {
      throw new Error("A image id is required");
    }

    const image = await getImage(id);

    if (!image) {
      throw new Error("Image does not exist");
    }

    dispatch({ payload: image, type: "SET_IMAGE" });

    return image;
  }, [dispatch, id]);
  const { isError, isLoading, status } = useQuery({
    isEnabled: !!id && !image,
    queryFn,
  });

  const data = useMemo(() => {
    if (!image) {
      return undefined;
    }

    return mapImage(image, state);
  }, [image, state]);

  return {
    data,
    isError,
    isLoading,
    status,
  };
};

export default useImage;
