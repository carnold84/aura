import { useCallback } from "react";

import useStore from "../stores/store";
import { ImageWithProjects, ProjectWithImages } from "../types";
import { ProjectImage } from "../types/projectImageTypes";
import useMutation from "./useMutation";

interface UseUnlinkImageFromProjectOptions {
  onSuccess?: (data: ProjectImage) => void;
}

const useUnlinkImageFromProject = (
  options?: UseUnlinkImageFromProjectOptions,
) => {
  const remove = useStore((store) => store.projectsImages.delete);
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
