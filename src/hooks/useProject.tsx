import { useQuery } from "@tanstack/react-query";

import { getProject } from "../api";

const useProject = (projectId?: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!projectId,
    queryKey: ["projects", { projectId }],
    queryFn: () => getProject(projectId),
  });

  return { data, error, isError, isLoading, status };
};

export default useProject;
