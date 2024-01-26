import { useMutation } from "@tanstack/react-query";

import { createProject } from "../api";
import { CreateProject } from "../api/types";

const useCreateProject = () => {
  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: CreateProject) => createProject(data),
  });

  return { createProject: mutate, isError, isSaving: isPending };
};

export default useCreateProject;
