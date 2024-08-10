import { useCallback, useMemo } from "react";

import { getProject } from "../api";
import { mapProject } from "./useProjects";
import useQuery from "./useQuery";
import useStore from "./useStore";

interface UseProjectsOptions {
  id?: string;
}

const useProject = ({ id }: UseProjectsOptions) => {
  const { dispatch, state } = useStore();
  const project = id ? state.projects.data.get(id) : undefined;

  const queryFn = useCallback(async () => {
    if (!id) {
      throw new Error("A project id is required");
    }

    const project = await getProject(id);

    if (!project) {
      throw new Error("Project does not exist");
    }

    dispatch({ payload: project, type: "SET_PROJECT" });

    return project;
  }, [dispatch, id]);

  const { isError, isLoading, isSuccess, status } = useQuery({
    isEnabled: !!id && !project,
    queryFn,
  });

  const data = useMemo(() => {
    if (!project) {
      return undefined;
    }

    return mapProject(project, state);
  }, [project, state]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    status,
  };
};

export default useProject;
