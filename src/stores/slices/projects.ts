import { StateCreator } from "zustand";

import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../../api";
import { CreateProject, ProjectWithImages, UpdateProject } from "../../types";
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

const createProjectsSlice: StateCreator<
  ProjectsSlice & ProjectsImagesSlice,
  [],
  [],
  ProjectsSlice
> = (set, get) => ({
  projects: {
    create: async (data: CreateProject) => {
      const projects = get().projects;
      const nextData = projects.data;
      const response = await createProject(data);
      nextData?.set(response.id, response);

      set({ projects: { ...projects, data: nextData } });

      return response;
    },
    data: new Map(),
    delete: async (project: ProjectWithImages) => {
      const projects = get().projects;
      const nextData = projects.data;
      const response = await deleteProject(project);
      nextData?.delete(response.id);

      set({ projects: { ...projects, data: nextData } });

      return response;
    },
    get: async (id: string) => {
      const projects = get().projects;
      const project = projects.project(id);

      if (projects.isLoaded && project) {
        return project;
      }

      const response = await getProject(id);

      if (response) {
        const nextData = projects.data?.set(response.id, response);

        set({ projects: { ...projects, data: nextData } });
      }

      return response;
    },
    isLoaded: false,
    list: async () => {
      const projects = get().projects;
      if (projects.isLoaded) {
        return Promise.resolve(Array.from(projects.data.values()));
      }

      const response = await listProjects();
      const nextProjects = new Map();
      const projectsImages = get().projectsImages;
      const nextProjectImages = new Map();

      for (const project of response) {
        for (const image of project.images) {
          nextProjectImages.set(image.id, image);
        }
        project.images = [];
        nextProjects.set(project.id, project);
      }

      set({
        projects: { ...projects, isLoaded: true, data: nextProjects },
        projectsImages: { ...projectsImages, data: nextProjectImages },
      });

      return response;
    },
    project: (id: string | undefined) => {
      return id ? get().projects.data?.get(id) : undefined;
    },
    projects: () => {
      const data = get().projects.data;
      return data ? Array.from(data.values()) : undefined;
    },
    update: async (data: UpdateProject) => {
      const projects = get().projects;
      const nextData = projects.data;
      const response = await updateProject(data);
      nextData?.set(response.id, response);

      set({ projects: { ...projects, data: nextData } });

      return response;
    },
  },
});

export default createProjectsSlice;
