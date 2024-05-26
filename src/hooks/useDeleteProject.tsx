import { deleteProject } from "../api";
import { Project } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseDeleteProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const { dispatch } = useStore();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: Project) => {
      const project = await deleteProject(payload);

      dispatch({ payload: project, type: "REMOVE_PROJECT" });

      return project;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    deleteProject: mutate,
    ...rest,
  };
};

export default useDeleteProject;
