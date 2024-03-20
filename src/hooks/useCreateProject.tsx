import { useCallback } from "react";

import useStore from "../stores/store";
import { CreateProject, Project } from "../types";
import useMutation from "./useMutation";

interface UseCreateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useCreateProject = (options?: UseCreateProjectOptions) => {
  const create = useStore((store) => store.projects.create);
  const mutationFn = useCallback(
    (payload: CreateProject) => create(payload),
    [create],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    createProject: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useCreateProject;
