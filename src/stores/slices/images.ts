import { StateCreator } from "zustand";

import {
  createImage,
  deleteImage,
  getImage,
  listImages,
  updateImage,
} from "../../api";
import { CreateImage, Image, UpdateImage } from "../../types";

export interface ImagesSlice {
  images: {
    create: (data: CreateImage) => Promise<Image>;
    data: Map<string, Image>;
    delete: (data: Image) => Promise<Image>;
    get: (id: string) => Promise<Image | null>;
    isLoaded: boolean;
    list: () => Promise<Image[]>;
    image: (id: string) => Image | undefined;
    images: () => Image[] | undefined;
    update: (data: UpdateImage) => Promise<Image>;
  };
}

const createImagesSlice: StateCreator<ImagesSlice, [], [], ImagesSlice> = (
  set,
  get,
) => ({
  images: {
    create: async (data: CreateImage) => {
      const images = get().images;
      const nextData = images.data;
      const response = await createImage(data);
      nextData?.set(response.id, response);

      set({ images: { ...images, data: nextData } });

      return response;
    },
    data: new Map(),
    delete: async (image: Image) => {
      const images = get().images;
      const nextData = images.data;
      const response = await deleteImage(image);
      nextData?.delete(response.id);

      set({ images: { ...images, data: nextData } });

      return response;
    },
    get: async (id: string) => {
      const images = get().images;
      const image = images.image(id);

      if (images.isLoaded && image) {
        return image;
      }

      const response = await getImage(id);

      if (response) {
        const nextData = images.data?.set(response.id, response);

        set({ images: { ...images, data: nextData } });
      }

      return response;
    },
    isLoaded: false,
    list: async () => {
      const images = get().images;
      if (images.isLoaded) {
        return Promise.resolve(Array.from(images.data.values()));
      }

      const response = await listImages();
      const nextData = response.reduce((previous, current) => {
        return previous.set(current.id, current);
      }, new Map());

      set({ images: { ...images, isLoaded: true, data: nextData } });

      return response;
    },
    image: (id: string | undefined) => {
      return id ? get().images.data?.get(id) : undefined;
    },
    images: () => {
      const data = get().images.data;
      return data ? Array.from(data.values()) : undefined;
    },
    update: async (data: UpdateImage) => {
      const images = get().images;
      const nextData = images.data;
      const response = await updateImage(data);
      nextData?.set(response.id, response);

      set({ images: { ...images, data: nextData } });

      return response;
    },
  },
});

export default createImagesSlice;
