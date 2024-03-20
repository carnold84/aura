import { StateCreator } from "zustand";

import { listImages } from "../../api";
import { Project } from "../../types";

export interface ImagesSlice {
  images: {
    data: Map<string, Project> | undefined;
    images: () => Project[] | undefined;
    isLoaded: boolean;
    list: () => void;
  };
}

const createImagesSlice: StateCreator<ImagesSlice, [], [], ImagesSlice> = (
  set,
  get,
) => ({
  images: {
    data: undefined,
    images: () => {
      const data = get().images.data;
      return data ? Array.from(data.values()) : undefined;
    },
    isLoaded: false,
    list: async () => {
      const images = get().images;
      if (images.data) {
        return images.data;
      }

      const response = await listImages();
      const nextData = response.reduce((previous, current) => {
        return previous.set(current.id, current);
      }, new Map());

      set({ images: { ...images, isLoaded: true, data: nextData } });
    },
  },
});

export default createImagesSlice;
