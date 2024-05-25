import { updateProject } from "../api";
import { Types } from "../stores/reducer";
import { Project, UpdateProject } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseUpdateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useUpdateProject = (options?: UseUpdateProjectOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: UpdateProject) => {
      const project = await updateProject(payload);

      dispatch({ payload: project, type: Types.SET_PROJECT });

      return project;
    },
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
