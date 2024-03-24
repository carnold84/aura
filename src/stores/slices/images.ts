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
      const response = await createImage(data);
      images.data?.set(response.id, response);

      set({ images: { ...images, data: images.data } });

      return mapImage(response, storeData);
    },
    data: new Map(),
    delete: async (image: ImageWithProjects) => {
      const storeData = get();
      const images = storeData.images;
      const response = await deleteImage(image);
      images.data?.delete(response.id);

      set({ images: { ...images, data: images.data } });

      return mapImage(response, storeData);
    },
    get: async (id: string) => {
      const storeData = get();
      const images = storeData.images;
      const image = images.image(id);

      if (images.isLoaded && image) {
        return image;
      }

      const response = await getImage(id);

      if (response === null) {
        return null;
      }

      const projects = storeData.projects;
      const projectsImages = storeData.projectsImages;
      const nextProjects = new Map();
      const nextProjectImages = [];

      for (const project of response.projects) {
        nextProjects.set(project.id, project);
        nextProjectImages.push({ imageId: response.id, projectId: project.id });
      }

      const nextImages = images.data?.set(response.id, response);

      set({
        images: { ...images, data: nextImages },
        projects: { ...projects, data: nextProjects },
        projectsImages: { ...projectsImages, data: nextProjectImages },
      });

      return mapImage(response, storeData);
    },
    isLoaded: false,
    list: async () => {
      const images = get().images;
      if (images.isLoaded) {
        return Promise.resolve(Array.from(images.data.values()));
      }

      const response = await listImages();
      const nextImages = new Map();
      const projects = get().projects;
      const projectsImages = get().projectsImages;
      const nextProjectImages = [];
      const nextProjects = new Map();

      for (const image of response) {
        for (const project of image.projects) {
          nextProjects.set(project.id, project);
          nextProjectImages.push({ imageId: image.id, projectId: project.id });
        }
        image.projects = [];
        nextImages.set(image.id, image);
      }

      set({
        images: { ...images, isLoaded: true, data: nextImages },
        projects: { ...projects, data: nextProjects },
        projectsImages: { ...projectsImages, data: nextProjectImages },
      });

      return images.images() || [];
    },
    image: (id: string | undefined) => {
      if (!id) {
        return undefined;
      }

      const storeData = get();
      const imageData = storeData.images.data?.get(id);

      if (!imageData) {
        return undefined;
      }

      const image = mapImage(imageData, storeData);

      return image;
    },
    images: () => {
      const storeData = get();
      const imagesData = storeData.images.data;

      const images = [];

      for (const image of imagesData.values()) {
        images.push(mapImage(image, storeData));
      }

      return images;
    },
    update: async (data: UpdateImage) => {
      const storeData = get();
      const images = storeData.images;
      const response = await updateImage(data);
      const updatedProject = mapImage(response, storeData);
      images.data?.set(updatedProject.id, updatedProject);

      set({ images: { ...images, data: images.data } });

      return updatedProject;
    },
  },
});

export default createImagesSlice;
