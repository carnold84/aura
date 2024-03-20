import { useCallback } from "react";

import useStore from "../stores/store";
import { Project } from "../types";
import useMutation from "./useMutation";

interface UseDeleteProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const deleteProject = useStore((store) => store.projects.delete);
  const mutationFn = useCallback(
    (payload: Project) => deleteProject(payload),
    [deleteProject],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    deleteProject: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useDeleteProject;
