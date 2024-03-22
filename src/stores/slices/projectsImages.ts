import { StateCreator } from "zustand";

import { createImage, deleteImage, getImage } from "../../api";
import { CreateImage, Image } from "../../types";

export interface ProjectsImagesSlice {
  projectsImages: {
    create: (data: CreateImage) => Promise<Image>;
    data: Map<string, Image>;
    delete: (data: Image) => Promise<Image>;
    get: (id: string) => Promise<Image | null>;
    isLoaded: boolean;
  };
}

const createProjectsImagesSlice: StateCreator<
  ProjectsImagesSlice,
  [],
  [],
  ProjectsImagesSlice
> = (set, get) => ({
  projectsImages: {
    create: async (data: CreateImage) => {
      const projectsImages = get().projectsImages;
      const nextData = projectsImages.data;
      const response = await createImage(data);
      nextData?.set(response.id, response);

      set({ projectsImages: { ...projectsImages, data: nextData } });

      return response;
    },
    data: new Map(),
    delete: async (image: Image) => {
      const projectsImages = get().projectsImages;
      const nextData = projectsImages.data;
      const response = await deleteImage(image);
      nextData?.delete(response.id);

      set({ projectsImages: { ...projectsImages, data: nextData } });

      return response;
    },
    get: async (id: string) => {
      const projectsImages = get().projectsImages;
      const image = projectsImages.get(id);

      if (projectsImages.isLoaded && image) {
        return image;
      }

      const response = await getImage(id);

      if (response) {
        const nextData = projectsImages.data?.set(response.id, response);

        set({ projectsImages: { ...projectsImages, data: nextData } });
      }

      return response;
    },
    isLoaded: false,
  },
});

export default createProjectsImagesSlice;
