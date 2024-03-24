import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { ProjectWithImages } from "../types";
import useMutation from "./useMutation";

interface UseDeleteProjectOptions {
  onSuccess?: (data: ProjectWithImages) => void;
}

const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const deleteProject = useDataStore((store) => store.projects.delete);
  const mutationFn = useCallback(
    (payload: ProjectWithImages) => deleteProject(payload),
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
