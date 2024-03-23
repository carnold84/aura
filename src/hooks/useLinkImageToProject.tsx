import { useCallback } from "react";

import useStore from "../stores/store";
import { ImageWithProjects, ProjectWithImages } from "../types";
import { ProjectImage } from "../types/projectImageTypes";
import useMutation from "./useMutation";

interface UseLinkImageToProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useLinkImageToProject = (options?: UseLinkImageToProjectOptions) => {
  const create = useStore((store) => store.projectsImages.create);
  const mutationFn = useCallback(
    ({
      image,
      project,
    }: {
      image: ImageWithProjects;
      project: ProjectWithImages;
    }) => create(image, project),
    [create],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    linkImageToProject: mutate,
    isError,
    isLinking: isLoading,
    status,
  };
};

export default useLinkImageToProject;
