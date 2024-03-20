import { StateCreator } from "zustand";

import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../../api";
import { CreateProject, Project, UpdateProject } from "../../types";

export interface ProjectsSlice {
  projects: {
    create: (data: CreateProject) => Promise<Project>;
    data: Map<string, Project>;
    delete: (data: Project) => Promise<Project>;
    get: (id: string) => Promise<Project | null>;
    isLoaded: boolean;
    list: () => Promise<Project[]>;
    project: (id: string) => Project | undefined;
    projects: () => Project[] | undefined;
    update: (data: UpdateProject) => Promise<Project>;
  };
}

const createProjectsSlice: StateCreator<
  ProjectsSlice,
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
    delete: async (project: Project) => {
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
      const nextData = response.reduce((previous, current) => {
        return previous.set(current.id, current);
      }, new Map());

      set({ projects: { ...projects, isLoaded: true, data: nextData } });

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
