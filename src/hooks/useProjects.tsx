import { useQuery } from "@tanstack/react-query";

import { listProjects } from "../api";

const useProjects = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ["projects"],
    queryFn: () => listProjects(),
  });

  return { data, error, isError, isLoading, status };
};

export default useProjects;
