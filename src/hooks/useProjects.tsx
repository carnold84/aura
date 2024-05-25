import { useEffect, useMemo, useState } from "react";

import { listProjects } from "../api";
import { State, Types } from "../stores/reducer";
import { Project, ProjectWithImages } from "../types";
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

type Status = "error" | "idle" | "loading";

interface UseProjectsOptions {
  sortBy?: "createdAt" | "updatedAt";
}

const useProjects = (options?: UseProjectsOptions) => {
  const { dispatch, state } = useStore();
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (state.projects.isLoaded === false && status === "idle") {
      console.log("load projects");
      setStatus("loading");

      try {
        const load = async () => {
          const projects = await listProjects();

          dispatch({ payload: projects, type: Types.SET_PROJECTS });

          setStatus("idle");
        };
        load();
      } catch {
        setStatus("error");
      }
    }
  }, [dispatch, state.projects.isLoaded, status]);

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
    isError: status === "error",
    isLoading: status === "loading",
    status,
  };
};

export default useProjects;
