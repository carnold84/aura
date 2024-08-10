import { createProject } from "../api";
import { CreateProject, Project } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseCreateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useCreateProject = (options?: UseCreateProjectOptions) => {
  const { dispatch } = useStore();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: CreateProject) => {
      const project = await createProject(payload);

      dispatch({ payload: project, type: "SET_PROJECT" });

      return project;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    createProject: mutate,
    ...rest,
  };
};

export default useCreateProject;
