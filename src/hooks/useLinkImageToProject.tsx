import { createProjectImage } from "../api";
import { CreateProjectImage, ProjectImage } from "../types";
import useMutation from "./useMutation";
import useStore from "./useStore";

interface UseLinkImageToProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useLinkImageToProject = (options?: UseLinkImageToProjectOptions) => {
  const { dispatch } = useStore();
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn: async (payload: CreateProjectImage) => {
      const projectImage = await createProjectImage(payload);

      dispatch({ payload: projectImage, type: "SET_PROJECT_IMAGE" });

      return projectImage;
    },
    onSuccess: options?.onSuccess,
  });

  return {
    linkImageToProject: mutate,
    isError,
    isLoading,
    status,
  };
};

export default useLinkImageToProject;
