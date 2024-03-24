import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { ImageWithProjects, ProjectImage, ProjectWithImages } from "../types";
import useMutation from "./useMutation";

interface UseLinkImageToProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useLinkImageToProject = (options?: UseLinkImageToProjectOptions) => {
  const create = useDataStore((store) => store.projectsImages.create);
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
