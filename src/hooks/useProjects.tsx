import { useEffect, useMemo, useState } from "react";

import { listProjects } from "../api";
import { Types } from "../stores/reducer";
import { ProjectWithImages } from "../types";
import useStore from "./useStore";

type Status = "error" | "idle" | "loading";

interface UseProjectsOptions {
  sortBy?: "createdAt" | "updatedAt";
}

const useProjects = (options?: UseProjectsOptions) => {
  const {
    dispatch,
    state: { images, projects, projectsImages },
  } = useStore();
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (projects.isLoaded === false && status === "idle") {
      console.log("load");
      try {
        const load = async () => {
          setStatus("loading");
          const projects = await listProjects();

          console.log(projects);

          dispatch({ payload: projects, type: Types.SET_PROJECTS });

          setStatus("idle");
        };
        load();
      } catch {
        setStatus("error");
      }
    }
  }, [dispatch, projects.isLoaded, status]);

  const data = useMemo(() => {
    if (projects.isLoaded === false) {
      return undefined;
    }

    const sortBy = options?.sortBy;
    const nextProjects = [];

    for (const project of projects.data.values()) {
      const nextProject: ProjectWithImages = {
        ...project,
        images: [],
      };
      projectsImages.forEach(({ imageId, projectId }) => {
        const image = images.data.get(imageId);
        if (projectId === project.id && image) {
          nextProject.images.push(image);
        }
      });
      nextProjects.push(nextProject);
    }

    if (sortBy) {
      return nextProjects?.sort((a, b) =>
        a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0,
      );
    }

    return nextProjects;
  }, [
    images.data,
    projects.data,
    projects.isLoaded,
    projectsImages,
    options?.sortBy,
  ]);

  return {
    data,
    isError: status === "error",
    isLoading: status === "loading",
    status,
  };
};

export default useProjects;
