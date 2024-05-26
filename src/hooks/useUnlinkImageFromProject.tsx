import { deleteProjectImage } from "../api";
import { DeleteProjectImage, ProjectImage } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseUnlinkImageFromProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useUnlinkImageFromProject = (
  options?: UseUnlinkImageFromProjectOptions,
) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: DeleteProjectImage) => {
      const projectImage = await deleteProjectImage(payload);

      dispatch({ payload: projectImage, type: "REMOVE_PROJECT_IMAGE" });

      return projectImage;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    unlinkImagefromProject: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useUnlinkImageFromProject;
