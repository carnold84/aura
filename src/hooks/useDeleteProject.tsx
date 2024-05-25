import { deleteProject } from "../api";
import { Types } from "../stores/reducer";
import { ProjectWithImages } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseDeleteProjectOptions {
  onSuccess?: (data: ProjectWithImages) => void;
}

const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: ProjectWithImages) => {
      const project = await deleteProject(payload);

      dispatch({ payload: project, type: Types.REMOVE_PROJECT });

      return project;
    },
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
