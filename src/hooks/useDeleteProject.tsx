import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "../api";
import { Project } from "../api/types";

interface useDeleteProjectProps {
  onSuccess?: () => void;
}

const useDeleteProject = ({ onSuccess }: useDeleteProjectProps) => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (data: Project) => deleteProject(data),
    onSuccess: (project: Project) => {
      queryClient.setQueryData(["projects"], (projects: Project[]) => {
        return projects
          ? projects.filter(({ id }) => project.id !== id)
          : projects;
      });
      queryClient.setQueryData(["projects", { id: project.id }], undefined);

      onSuccess && onSuccess();
    },
  });

  return { deleteProject: mutate, isError, isDeleting: isPending };
};

export default useDeleteProject;
