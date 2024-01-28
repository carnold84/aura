import { useMutation } from "@tanstack/react-query";

import { linkImageToProject } from "../api";
import { Image, ListProject } from "../api/types";

const useLinkImageToProject = () => {
  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ image, project }: { image: Image; project: ListProject }) =>
      linkImageToProject(image, project),
  });

  return { linkImageToProject: mutate, isError, isSaving: isPending };
};

export default useLinkImageToProject;
