import useStore from "../stores/store";
import { Project } from "../types";
import useMutation from "./useMutation";

interface UseDeleteProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const deleteProject = useStore((store) => store.projects.delete);
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: (payload: Project) => deleteProject(payload),
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
