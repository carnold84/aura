import { StateCreator } from "zustand";

import { createProjectImage, deleteProjectImage } from "../../../api";
import {
  ImageWithProjects,
  ProjectImage,
  ProjectWithImages,
} from "../../../types";

export interface ProjectsImagesSlice {
  projectsImages: {
    create: (
      image: ImageWithProjects,
      project: ProjectWithImages,
    ) => Promise<ProjectImage>;
    data: ProjectImage[];
    delete: (
      image: ImageWithProjects,
      project: ProjectWithImages,
    ) => Promise<ProjectImage>;
  };
}

const createProjectsImagesSlice: StateCreator<
  ProjectsImagesSlice,
  [],
  [],
  ProjectsImagesSlice
> = (set, get) => ({
  projectsImages: {
    create: async (image: ImageWithProjects, project: ProjectWithImages) => {
      const projectsImages = get().projectsImages;
      const response = await createProjectImage(image, project);

      set({
        projectsImages: {
          ...projectsImages,
          data: [...projectsImages.data, response],
        },
      });

      return response;
    },
    data: [],
    delete: async (image: ImageWithProjects, project: ProjectWithImages) => {
      const projectsImages = get().projectsImages;
      const response = await deleteProjectImage(image, project);
      const nextData = projectsImages.data.filter(({ imageId, projectId }) => {
        return imageId !== response.imageId || projectId !== response.projectId;
      });

      set({ projectsImages: { ...projectsImages, data: nextData } });

      return response;
    },
  },
});

export default createProjectsImagesSlice;
