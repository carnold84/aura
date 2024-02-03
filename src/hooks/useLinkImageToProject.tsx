import { useMutation } from "@tanstack/react-query";

import { linkImageToProject } from "../api";
import { Image, Project } from "../api/types";

const useLinkImageToProject = () => {
  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ image, project }: { image: Image; project: Project }) =>
      linkImageToProject(image, project),
  });

  return { linkImageToProject: mutate, isError, isSaving: isPending };
};

export default useLinkImageToProject;
