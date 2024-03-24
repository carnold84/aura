import { useCallback } from "react";

import useDataStore from "../stores/data/dataStore";
import { ImageWithProjects, ProjectImage, ProjectWithImages } from "../types";
import useMutation from "./useMutation";

interface UseUnlinkImageFromProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useUnlinkImageFromProject = (
  options?: UseUnlinkImageFromProjectOptions,
) => {
  const remove = useDataStore((store) => store.projectsImages.delete);
  const mutationFn = useCallback(
    ({
      image,
      project,
    }: {
      image: ImageWithProjects;
      project: ProjectWithImages;
    }) => remove(image, project),
    [remove],
  );
  const { isError, isLoading, mutate, status } = useMutation({
    mutationFn,
    onSuccess: options?.onSuccess,
  });

  return {
    unlinkImagefromProject: mutate,
    isError,
    isUnlinking: isLoading,
    status,
  };
};

export default useUnlinkImageFromProject;
