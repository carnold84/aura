import { updateProject } from "../api";
import { Project, UpdateProject } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseUpdateProjectOptions {
  onSuccess?: (data: Project) => void;
}

const useUpdateProject = (options?: UseUpdateProjectOptions) => {
  const { dispatch } = useStore();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: UpdateProject) => {
      const project = await updateProject(payload);

      dispatch({ payload: project, type: "SET_PROJECT" });

      return project;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    updateProject: mutate,
    ...rest,
  };
};

export default useUpdateProject;
