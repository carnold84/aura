import { useCallback } from "react";

import useStore from "../stores/store";
import { Project, UpdateProject } from "../types";
import useMutation from "./useMutation";

interface UseUpdateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useUpdateProject = (options?: UseUpdateProjectOptions) => {
  const update = useStore((store) => store.projects.update);
  const mutationFn = useCallback(
    (payload: UpdateProject) => update(payload),
    [update],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    updateProject: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useUpdateProject;
