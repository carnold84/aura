import { StateCreator } from "zustand";

import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../../api";
import {
  CreateProject,
  Image,
  ProjectWithImages,
  UpdateProject,
} from "../../types";
import { ImagesSlice } from "./images";
import { ProjectsImagesSlice } from "./projectsImages";

export interface ProjectsSlice {
  projects: {
    create: (data: CreateProject) => Promise<ProjectWithImages>;
    data: Map<string, ProjectWithImages>;
    delete: (data: ProjectWithImages) => Promise<ProjectWithImages>;
    get: (id: string) => Promise<ProjectWithImages | null>;
    isLoaded: boolean;
    list: () => Promise<ProjectWithImages[]>;
    project: (id: string) => ProjectWithImages | undefined;
    projects: () => ProjectWithImages[] | undefined;
    update: (data: UpdateProject) => Promise<ProjectWithImages>;
  };
}

const mapProject = (
  projectData: ProjectWithImages,
  storeData: ProjectsSlice & ImagesSlice & ProjectsImagesSlice,
) => {
  const images = storeData.images.data;
  const projectsImages = storeData.projectsImages.data;
  const project = { ...projectData };
  console.log("projectsImages", projectsImages);

  project.images = projectsImages.reduce<Image[]>(
    (previous, { imageId, projectId }) => {
      const image = images.get(imageId);
      if (image && project.id === projectId) {
        return [...previous, image];
      }
      return previous;
    },
    [],
  );

  return project;
};

const createProjectsSlice: StateCreator<
  ProjectsSlice & ImagesSlice & ProjectsImagesSlice,
  [],
  [],
  ProjectsSlice
> = (set, get) => ({
  projects: {
    create: async (data: CreateProject) => {
      const storeData = get();
      const projects = storeData.projects;
      const response = await createProject(data);
      projects.data?.set(response.id, response);

      set({ projects: { ...projects, data: projects.data } });

      return mapProject(response, storeData);
    },
    data: new Map(),
    delete: async (project: ProjectWithImages) => {
      const storeData = get();
      const projects = storeData.projects;
      const response = await deleteProject(project);
      projects.data?.delete(response.id);

      set({ projects: { ...projects, data: projects.data } });

      return mapProject(response, storeData);
    },
    get: async (id: string) => {
      const storeData = get();
      const projects = storeData.projects;
      const project = projects.project(id);

      if (projects.isLoaded && project) {
        return project;
      }

      const response = await getProject(id);

      if (response === null) {
        return null;
      }
      console.log("get", response);

      const images = get().images;
      const projectsImages = get().projectsImages;
      const nextImages = new Map();
      const nextProjectImages = [];

      for (const image of response.images) {
        nextImages.set(image.id, image);
        nextProjectImages.push({ imageId: image.id, projectId: response.id });
      }

      const nextProjects = projects.data?.set(response.id, response);

      set({
        images: { ...images, data: nextImages },
        projects: { ...projects, data: nextProjects },
        projectsImages: { ...projectsImages, data: nextProjectImages },
      });

      return mapProject(response, storeData);
    },
    isLoaded: false,
    list: async () => {
      const projects = get().projects;
      if (projects.isLoaded) {
        return Promise.resolve(Array.from(projects.data.values()));
      }

      const response = await listProjects();
      const nextProjects = new Map();
      const images = get().images;
      const projectsImages = get().projectsImages;
      const nextProjectImages = [];
      const nextImages = new Map();

      for (const project of response) {
        for (const image of project.images) {
          nextImages.set(image.id, image);
          nextProjectImages.push({ imageId: image.id, projectId: project.id });
        }
        project.images = [];
        nextProjects.set(project.id, project);
      }

      set({
        images: { ...images, data: nextImages },
        projects: { ...projects, isLoaded: true, data: nextProjects },
        projectsImages: { ...projectsImages, data: nextProjectImages },
      });

      return projects.projects() || [];
    },
    project: (id: string | undefined) => {
      console.log("project");
      if (!id) {
        return undefined;
      }

      const projectData = get().projects.data?.get(id);

      if (!projectData) {
        return undefined;
      }

      const storeData = get();
      const project = mapProject(projectData, storeData);
      console.log("project", project);

      return project;
    },
    projects: () => {
      const storeData = get();
      const projectsData = storeData.projects.data;

      const projects = [];

      for (const project of projectsData.values()) {
        projects.push(mapProject(project, storeData));
      }
      console.log("projects", projects);

      return projects;
    },
    update: async (data: UpdateProject) => {
      const storeData = get();
      const projects = storeData.projects;
      const response = await updateProject(data);
      const updatedProject = mapProject(response, storeData);
      projects.data?.set(updatedProject.id, updatedProject);

      set({ projects: { ...projects, data: projects.data } });

      return updatedProject;
    },
  },
});

export default createProjectsSlice;
