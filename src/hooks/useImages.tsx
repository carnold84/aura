import { useCallback, useMemo } from "react";

import { listImages } from "../api";
import { State } from "../stores/data";
import { Image } from "../types";
import useQuery from "./useQuery";
import useStore from "./useStore";

export const mapImage = (image: Image, state: State) => {
  const nextImage: Image = {
    ...image,
    projects: [],
  };
  state.projectsImages.data.forEach(({ imageId, projectId }) => {
    const project = state.projects.data.get(projectId);
    if (imageId === image.id && project) {
      nextImage.projects.push(project);
    }
  });

  return nextImage;
};

interface UseImagesOptions {
  sortBy?: "createdAt" | "updatedAt";
}

const useImages = (options?: UseImagesOptions) => {
  const { dispatch, state } = useStore();

  const queryFn = useCallback(async () => {
    const images = await listImages();

    dispatch({ payload: images, type: "SET_IMAGES" });

    return images;
  }, [dispatch]);
  const { isError, isLoading, status } = useQuery({
    isEnabled: state.images.isLoaded === false,
    queryFn,
  });

  const data = useMemo(() => {
    if (state.images.isLoaded === false) {
      return undefined;
    }

    const sortBy = options?.sortBy;
    const nextImages = [];

    for (const image of state.images.data.values()) {
      const nextProject = mapImage(image, state);
      nextImages.push(nextProject);
    }

    if (sortBy) {
      return nextImages?.sort((a, b) =>
        a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0,
      );
    }

    return nextImages;
  }, [state, options?.sortBy]);

  return {
    data,
    isError,
    isLoading,
    status,
  };
};

export default useImages;
