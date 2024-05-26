import { useCallback, useMemo } from "react";

import { listProjects } from "../api";
import { State } from "../stores/store";
import { Project, ProjectWithImages } from "../types";
import useQuery from "./useQuery";
import useStore from "./useStore";

export const mapProject = (project: Project, state: State) => {
  const nextProject: ProjectWithImages = {
    ...project,
    images: [],
  };
  state.projectsImages.forEach(({ imageId, projectId }) => {
    const image = state.images.data.get(imageId);
    if (projectId === project.id && image) {
      nextProject.images.push(image);
    }
  });

  return nextProject;
};

interface UseProjectsOptions {
  sortBy?: "createdAt" | "updatedAt";
}

const useProjects = (options?: UseProjectsOptions) => {
  const { dispatch, state } = useStore();

  const queryFn = useCallback(async () => {
    const projects = await listProjects();

    dispatch({ payload: projects, type: "SET_PROJECTS" });

    return projects;
  }, [dispatch]);
  const { isError, isLoading, status } = useQuery({
    isEnabled: state.projects.isLoaded === false,
    queryFn,
  });

  const data = useMemo(() => {
    if (state.projects.isLoaded === false) {
      return undefined;
    }

    const sortBy = options?.sortBy;
    const nextProjects = [];

    for (const project of state.projects.data.values()) {
      const nextProject = mapProject(project, state);
      nextProjects.push(nextProject);
    }

    if (sortBy) {
      return nextProjects?.sort((a, b) =>
        a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0,
      );
    }

    return nextProjects;
  }, [state, options?.sortBy]);

  return {
    data,
    isError,
    isLoading,
    status,
  };
};

export default useProjects;
