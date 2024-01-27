import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "../api";
import { CreateProject, Project } from "../api/types";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: CreateProject) => createProject(data),
    onSuccess: (project: Project) => {
      queryClient.setQueryData(["projects"], (projects: Project[]) => {
        return projects ? [...projects, project] : projects;
      });
    },
  });

  return { createProject: mutate, isError, isSaving: isPending };
};

export default useCreateProject;
