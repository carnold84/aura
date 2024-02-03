import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "../api";
import { CreateProject, Project } from "../api/types";

interface UseCreateProjectProps {
  onSuccess: (project: Project) => void;
}

const useCreateProject = ({ onSuccess }: UseCreateProjectProps) => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: CreateProject) => createProject(data),
    onSuccess: (project: Project) => {
      queryClient.setQueryData(["projects"], (projects: Project[]) => {
        return projects ? [...projects, project] : projects;
      });
      onSuccess && onSuccess(project);
    },
  });

  return { createProject: mutate, isError, isSaving: isPending };
};

export default useCreateProject;
