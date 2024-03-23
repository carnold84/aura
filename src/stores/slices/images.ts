import { StateCreator } from "zustand";

import {
  createImage,
  deleteImage,
  getImage,
  listImages,
  updateImage,
} from "../../api";
import {
  CreateImage,
  ImageWithProjects,
  Project,
  UpdateImage,
} from "../../types";
import { ProjectsSlice } from "./projects";
import { ProjectsImagesSlice } from "./projectsImages";

export interface ImagesSlice {
  images: {
    create: (data: CreateImage) => Promise<ImageWithProjects>;
    data: Map<string, ImageWithProjects>;
    delete: (data: ImageWithProjects) => Promise<ImageWithProjects>;
    get: (id: string) => Promise<ImageWithProjects | null>;
    isLoaded: boolean;
    list: () => Promise<ImageWithProjects[]>;
    image: (id: string) => ImageWithProjects | undefined;
    images: () => ImageWithProjects[] | undefined;
    update: (data: UpdateImage) => Promise<ImageWithProjects>;
  };
}

const mapImage = (
  imageData: ImageWithProjects,
  storeData: ProjectsSlice & ImagesSlice & ProjectsImagesSlice,
) => {
  const projects = storeData.projects.data;
  const projectsImages = storeData.projectsImages.data;
  const image = { ...imageData };

  image.projects = projectsImages.reduce<Project[]>(
    (previous, { imageId, projectId }) => {
      const project = projects.get(projectId);
      if (project && image.id === imageId) {
        return [...previous, project];
      }
      return previous;
    },
    [],
  );

  return image;
};

const createImagesSlice: StateCreator<
  ProjectsSlice & ImagesSlice & ProjectsImagesSlice,
  [],
  [],
  ImagesSlice
> = (set, get) => ({
  images: {
    create: async (data: CreateImage) => {
      const storeData = get();
      const images = storeData.images;
      const nextData = images.data;
      const response = await createImage(data);
      nextData?.set(response.id, response);

      set({ images: { ...images, data: nextData } });

      return mapImage(response, storeData);
    },
    data: new Map(),
    delete: async (image: ImageWithProjects) => {
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
