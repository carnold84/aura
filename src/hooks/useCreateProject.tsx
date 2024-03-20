import useStore from "../stores/store";
import { CreateProject, Project } from "../types";
import useMutation from "./useMutation";

interface UseCreateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useCreateProject = (options?: UseCreateProjectOptions) => {
  const createProject = useStore((store) => store.projects.create);
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: (payload: CreateProject) => createProject(payload),
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
