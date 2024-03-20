import { StateCreator } from "zustand";

import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
} from "../../api";
import { CreateProject, Project } from "../../types";

export interface ProjectsSlice {
  projects: {
    create: (data: CreateProject) => Promise<Project>;
    data: Map<string, Project> | undefined;
    delete: (data: Project) => Promise<Project>;
    get: (variables: { id: string }) => Promise<Project>;
    isLoaded: boolean;
    list: () => Promise<Project[]>;
    project: (id: string) => Project | undefined;
    projects: () => Project[] | undefined;
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
    data: undefined,
    delete: async (project: Project) => {
      const projects = get().projects;
      const nextData = projects.data;
      const response = await deleteProject(project);
      nextData?.delete(response.id);

      set({ projects: { ...projects, data: nextData } });

      return response;
    },
    get: async ({ id }: { id: string }) => {
      const projects = get().projects;
      const project = projects.project(id);
      if (projects.isLoaded && project) {
        return project;
      }

      const response = await getProject(id);
      const nextData = projects.data?.set(response.id, response);

      set({ projects: { ...projects, data: nextData } });

      return response;
    },
    isLoaded: false,
    list: async () => {
      const projects = get().projects;
      if (projects.isLoaded) {
        return projects.data;
      }

      const response = await listProjects();
      const nextData = response.reduce((previous, current) => {
        return previous.set(current.id, current);
      }, new Map());

      set({ projects: { ...projects, isLoaded: true, data: nextData } });

      return nextData;
    },
    project: (id: string) => {
      return get().projects.data?.get(id);
    },
    projects: () => {
      const data = get().projects.data;
      return data ? Array.from(data.values()) : undefined;
    },
  },
});

export default createProjectsSlice;
