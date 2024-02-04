import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "../api";
import { Project, UpdateProject } from "../api/types";

interface MutationFnArgs {
  id: string;
  project: UpdateProject;
}

interface UseUpdateProjectProps {
  onSuccess?: (project: Project) => void;
}

const useUpdateProject = ({ onSuccess }: UseUpdateProjectProps = {}) => {
  const queryClient = useQueryClient();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ id, project }: MutationFnArgs) =>
      updateProject({
        id,
        project,
      }),
    onSuccess: (project: Project) => {
      queryClient.setQueryData(["projects", "list"], (projects: Project[]) => {
        return projects
          ? projects.map((element) => {
              if (element.id === project.id) {
                return project;
              }

              return element;
            })
          : projects;
      });
      queryClient.setQueryData(["projects", "list", project.id], project);
      onSuccess && onSuccess(project);
    },
  });

  return { updateProject: mutate, isError, isUpdating: isPending };
};

export default useUpdateProject;
